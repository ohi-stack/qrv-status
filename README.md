# qrv-status

Public status and uptime dashboard for QR-V™ network services.

## Current Production Rule

Until this repository becomes a real monitoring application, the canonical public status page is:

```txt
https://qrv.network/status
```

The dedicated status subdomain may later be deployed at:

```txt
https://status.qrv.network
```

## Services To Monitor

- `https://qrv.network/health`
- `https://qrv.network/ready`
- `https://verify.qrv.network/health`
- `https://verify.qrv.network/readyz`
- `https://registry.qrv.network/health`
- `https://registry.qrv.network/ready`
- `https://api.qrv.network/health`
- `https://api.qrv.network/ready`
- `https://issuer.qrv.network/health`
- `https://issuer.qrv.network/readyz`

## Required App Features

1. Service status cards.
2. Last checked timestamp.
3. Incident history.
4. Degraded-service labels.
5. Public uptime summary.
6. JSON status endpoint.
7. No secrets or admin controls.

## Status Labels

- `OPERATIONAL`
- `DEGRADED`
- `PARTIAL_OUTAGE`
- `MAINTENANCE`
- `RESERVED`
- `UNKNOWN`

## Current Status

Planning repository. Public status is currently consolidated into `qrv.network/status`.
