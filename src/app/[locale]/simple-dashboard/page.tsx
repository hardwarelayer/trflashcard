import Link from 'next/link';

export default function SimpleDashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎉 Simple Dashboard</h1>
      <p>This is a simple dashboard without Refine to test routing.</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Test Links:</h2>
        <ul>
          <li><Link href="/vi/simple-dashboard">Vietnamese</Link></li>
          <li><Link href="/en/simple-dashboard">English</Link></li>
        </ul>
      </div>
    </div>
  );
}
