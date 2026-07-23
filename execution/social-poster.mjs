import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV paths to check (prioritize 60days calendar)
const CSV_PATHS = [
  path.join(__dirname, '../content_calendar_60days.csv'),
  path.join(__dirname, 'content_calendar.csv')
];

// Helper to parse CSV properly handling quotes
function parseCSV(text) {
  const lines = [];
  let currentLine = [];
  let currentCell = '';
  let insideQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (char === '"' && insideQuotes && nextChar === '"') {
      currentCell += '"';
      i++; // skip next quote
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      currentLine.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentLine.push(currentCell.trim());
      if (currentLine.some(c => c !== '')) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  if (currentCell || currentLine.length > 0) {
    currentLine.push(currentCell.trim());
    if (currentLine.some(c => c !== '')) {
      lines.push(currentLine);
    }
  }
  return lines;
}

function stringifyCSV(rows) {
  return rows.map(row => 
    row.map(cell => {
      if (cell === null || cell === undefined) return '';
      const str = String(cell);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',')
  ).join('\n') + '\n';
}

async function run() {
  console.log('🚀 Starting HarvestFarm Social Media Poster...');
  
  // 1. Get today's date in Kenya Time (EAT = UTC+3)
  const now = new Date();
  const kenyaTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
  const dd = String(kenyaTime.getUTCDate()).padStart(2, '0');
  const mm = String(kenyaTime.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = kenyaTime.getUTCFullYear();
  
  const todayDMY = `${dd}/${mm}/${yyyy}`;
  const todayISO = `${yyyy}-${mm}-${dd}`;
  console.log(`📅 Today is: ${todayISO} / ${todayDMY}`);

  // 2. Find and read the CSV
  let activeCsvPath = null;
  let csvData = '';
  
  for (const p of CSV_PATHS) {
    if (fs.existsSync(p)) {
      activeCsvPath = p;
      csvData = fs.readFileSync(p, 'utf-8');
      break;
    }
  }
  
  if (!activeCsvPath) {
    console.error('❌ Could not find any content_calendar CSV files!');
    process.exit(1);
  }
  
  console.log(`📂 Using calendar: ${path.basename(activeCsvPath)}`);
  
  const rows = parseCSV(csvData);
  if (rows.length < 2) {
    console.log('⚠️ CSV is empty or only has headers.');
    return;
  }
  
  const headers = rows[0].map(h => h.toLowerCase());
  
  const dateIdx = headers.findIndex(h => h === 'date');
  let textIdx = headers.findIndex(h => h.includes('rebranded text') || h === 'caption');
  if (textIdx === -1) textIdx = headers.findIndex(h => h.includes('competitor post text'));
  const urlIdx = headers.findIndex(h => h === 'media url');
  const statusIdx = headers.findIndex(h => h === 'status');
  
  if (dateIdx === -1 || urlIdx === -1) {
    console.error('❌ CSV is missing required columns (Date, Media URL)');
    process.exit(1);
  }
  
  // 3. Find today's post
  let targetRowIndex = -1;
  let postFound = false;
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const dateStr = (row[dateIdx] || '').trim();
    const status = (statusIdx !== -1 && row[statusIdx]) ? row[statusIdx].toLowerCase() : '';
    
    if ((dateStr === todayDMY || dateStr === todayISO) && (status === '' || status === 'scheduled')) {
      targetRowIndex = i;
      postFound = true;
      break;
    }
  }
  
  if (!postFound) {
    console.log('🛑 No post scheduled for today (or it has already been posted). Exiting.');
    return;
  }
  
  const targetRow = rows[targetRowIndex];
  const caption = targetRow[textIdx] || '';
  const mediaUrl = targetRow[urlIdx] || '';
  
  console.log('📝 Found post for today!');
  console.log(`- Caption Length: ${caption.length} chars`);
  console.log(`- Media URL: ${mediaUrl}`);
  
  if (!mediaUrl) {
    console.error('❌ No Media URL provided for this post. Cannot post to Facebook.');
    process.exit(1);
  }
  
  // 4. Implement Jitter
  // Note: We use minutes, but cap it at a max of 4 minutes. 
  // Why? GitHub Actions gives you 2,000 free minutes per month. 
  // If we wait 45 minutes per post, twice a day, you will run out of free minutes!
  // A 1 to 4 minute random delay is more than enough to look completely organic to Facebook.
  const minJitterMinutes = 1;
  const maxJitterMinutes = 4;
  const jitterSecs = Math.floor(Math.random() * ((maxJitterMinutes - minJitterMinutes) * 60 + 59)) + (minJitterMinutes * 60);
  console.log(`🎲 Jitter: waiting ${Math.floor(jitterSecs / 60)}m ${jitterSecs % 60}s before posting...`);
  await new Promise(r => setTimeout(r, jitterSecs * 1000));
  
  // 5. Post to Facebook
  const fbToken = process.env.FACEBOOK_ACCESS_TOKEN;
  if (!fbToken) {
    console.error('❌ FACEBOOK_ACCESS_TOKEN is missing in environment variables!');
    process.exit(1);
  }
  
  console.log('🚀 Sending request to Facebook Graph API...');
  const fbUrl = "https://graph.facebook.com/v19.0/386858154516796/photos";
  const formData = new URLSearchParams();
  formData.append("url", mediaUrl);
  formData.append("caption", caption.substring(0, 2000));
  formData.append("access_token", fbToken);
  
  try {
    const response = await fetch(fbUrl, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Facebook API Error:', result);
      process.exit(1);
    }
    
    console.log('✅ Successfully posted to Facebook!', result.id || '');
    
    // 6. Update CSV status and write back to disk
    if (statusIdx !== -1) {
      rows[targetRowIndex][statusIdx] = 'Posted ✅';
    } else {
      rows[0].push('Status');
      for(let i=1; i<rows.length; i++) rows[i].push(i === targetRowIndex ? 'Posted ✅' : '');
    }
    
    const newCsvContent = stringifyCSV(rows);
    fs.writeFileSync(activeCsvPath, newCsvContent, 'utf-8');
    console.log('💾 Updated CSV file with Posted status.');
    
  } catch (error) {
    console.error('❌ Failed to post to Facebook:', error.message);
    process.exit(1);
  }
}

run();
