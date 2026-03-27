import { execSync } from 'child_process';

try {
  console.log('Fetching latest changes from GitHub...');
  const fetchResult = execSync('git fetch origin', { encoding: 'utf-8' });
  console.log('Fetch output:', fetchResult);
  
  console.log('Pulling latest changes...');
  const pullResult = execSync('git pull origin main', { encoding: 'utf-8' });
  console.log('Pull output:', pullResult);
  
  console.log('✓ Successfully pulled latest changes from GitHub');
} catch (error) {
  console.error('Error pulling changes:', error.message);
  process.exit(1);
}
