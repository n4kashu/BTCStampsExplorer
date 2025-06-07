// Simple health check for Docker container
try {
  const response = await fetch('http://localhost:8000/api/v2/stamps?limit=1');
  if (response.ok) {
    console.log('Health check passed');
    Deno.exit(0);
  } else {
    console.error('Health check failed: API not responding correctly');
    Deno.exit(1);
  }
} catch (error) {
  console.error('Health check failed:', error.message);
  Deno.exit(1);
}