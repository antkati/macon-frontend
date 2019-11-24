# Macon Frontend

### Install pm2

pm2

```bash
pm2 --name=macon --instances=2 --wait-ready --listen-timeout 10000 --cwd=/var/www/macon-frontend/www-master --log=../files/node.log start webpack.js -- --ssr --production --backendUrl=https://macon.dev.kozhindev.com
```

Nginx

```
    location / {
        proxy_pass http://127.0.0.1:5860;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
    }
```
