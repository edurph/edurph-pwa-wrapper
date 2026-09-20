const schools = require('../tenant-config.json');

function schoolSlugFromHost(host) {
  const cleanHost = String(host || '').toLowerCase().split(':')[0];
  if (!cleanHost.endsWith('.edurph.com')) return '';
  const slug = cleanHost.slice(0, -'.edurph.com'.length);
  return slug === 'www' ? '' : slug;
}

module.exports = function manifestHandler(req, res) {
  const slug = schoolSlugFromHost(req.headers.host);
  const school = schools[slug] || null;
  const name = school ? school.appName : 'EDURPH';
  const shortName = school ? school.schoolName : 'EDURPH';

  res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.statusCode = 200;
  res.end(JSON.stringify({
    id: '/',
    name: name,
    short_name: shortName,
    description: 'Sistem pengurusan sekolah dan e-RPH digital berbilang sekolah.',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#312e81',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ]
  }));
};

module.exports.schoolSlugFromHost = schoolSlugFromHost;
