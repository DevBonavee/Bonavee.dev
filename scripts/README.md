# Heartbeat script

`heartbeat.py` tells bonavee.dev that this computer is on. Every 60 seconds it sends a `POST` to `/api/heartbeat` with your secret and whether VS Code is open. The site shows **Working** while a heartbeat has arrived in the last 3 minutes, and **Not working** otherwise.

It uses only the Python standard library, so there is nothing to install beyond Python 3.

## 1. Add your secret

Create `scripts/.env` (it is git-ignored) with the same value you set as `HEARTBEAT_SECRET` in Vercel:

```
HEARTBEAT_SECRET=your-long-random-string
# Optional: point at a local dev server instead of the live site
# HEARTBEAT_URL=http://localhost:3000/api/heartbeat
```

Generate a secret with `python -c "import secrets; print(secrets.token_urlsafe(48))"`.

Check it works by running `python scripts/heartbeat.py` and watching the status pill on the site turn green within 30 seconds. Stop it with Ctrl+C.

## 2. Start it automatically at login

### Windows (Task Scheduler)

1. Open **Task Scheduler** and choose **Create Task…** (not "Basic Task").
2. **General**: name it `Bonavee heartbeat`. Choose **Run only when user is logged on**.
3. **Triggers** > **New…**: **Begin the task: At log on**, for your user.
4. **Actions** > **New…**: **Start a program**.
   - Program/script: the full path to `pythonw.exe`, for example `C:\Users\you\AppData\Local\Programs\Python\Python314\pythonw.exe`. Run `where pythonw` to find it.
   - Add arguments: the full path to the script in quotes, for example `"C:\path\to\bonavee_dev\scripts\heartbeat.py"`.
5. **Conditions**: untick **Start the task only if the computer is on AC power**.
6. **Settings**: untick **Stop the task if it runs longer than**.
7. Click **OK**, then right-click the task and choose **Run** to start it now.

`pythonw.exe` runs without a console window. To stop it, end the task in Task Scheduler, or end `pythonw.exe` in Task Manager.

### macOS (launchd)

Create `~/Library/LaunchAgents/dev.bonavee.heartbeat.plist`, replacing both paths:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>dev.bonavee.heartbeat</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/python3</string>
    <string>/Users/you/bonavee_dev/scripts/heartbeat.py</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardErrorPath</key>
  <string>/tmp/bonavee-heartbeat.log</string>
</dict>
</plist>
```

Load it now (it also loads at every login):

```sh
launchctl load ~/Library/LaunchAgents/dev.bonavee.heartbeat.plist
```

Stop it with `launchctl unload ~/Library/LaunchAgents/dev.bonavee.heartbeat.plist`.

### Linux (systemd user service)

Create `~/.config/systemd/user/bonavee-heartbeat.service`, replacing the path:

```ini
[Unit]
Description=Bonavee heartbeat
After=network-online.target

[Service]
ExecStart=/usr/bin/python3 %h/bonavee_dev/scripts/heartbeat.py
Restart=always
RestartSec=30

[Install]
WantedBy=default.target
```

Then enable and start it:

```sh
systemctl --user daemon-reload
systemctl --user enable --now bonavee-heartbeat.service
```

Check it with `systemctl --user status bonavee-heartbeat` and stop it with `systemctl --user disable --now bonavee-heartbeat`.

## Troubleshooting

- **Always "Not working"**: run the script in a terminal with `python scripts/heartbeat.py`. If `HEARTBEAT_SECRET` is missing you'll see a `KeyError`. A wrong secret gets a 401 from the site; the script ignores errors and retries, so test the secret with:
  `curl -i -X POST https://bonavee.dev/api/heartbeat -H "Authorization: Bearer YOUR_SECRET" -H "Content-Type: application/json" -d "{\"source\":\"laptop\",\"vscode\":true}"`
- **503 from the site**: `HEARTBEAT_SECRET` or the Upstash variables aren't set in Vercel.
- **Shows "Laptop online" without "coding in VS Code"**: VS Code isn't running, or its process has a different name on your system.
