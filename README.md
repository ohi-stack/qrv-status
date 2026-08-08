# QR-V™ Network Status — Consolidated Source Archive

The canonical public status surface is now:

```text
https://qrv.network/status
```

The consolidated network has two active runtime nodes:

```text
qrv.network
api.qrv.network
```

Public status should report:

- platform process health;
- API process health;
- API/database readiness;
- version information;
- incident state when applicable.

This repository remains useful for future monitoring, uptime history, incident tooling, and richer status UX, but it is not a required standalone production node.

If `status.qrv.network` is retained for compatibility, point it to `qrv-node`; the platform redirects it to `qrv.network/status`.
