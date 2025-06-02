const blacklistedIPs = new Set([
    "192.168.1.100"
  ]);
  
  function normalizeIp(ip) {
    if (!ip) return '';
    // Remove IPv6 prefix for IPv4-mapped addresses
    if (ip.startsWith('::ffff:')) {
      return ip.substring(7);
    }
    return ip;
  }
  
  function ipBlacklist(req, res, next) {
    let ip = req.ip || req.connection.remoteAddress;
    ip = normalizeIp(ip);
  
    if (blacklistedIPs.has(ip)) {
      return res.status(403).json({ error: 'Forbidden: Your IP is blacklisted' });
    }
    next();
  }
  
  module.exports = { ipBlacklist, blacklistedIPs };
  