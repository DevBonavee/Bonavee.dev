# Sends "I'm online" to bonavee.dev every 60s while this computer is awake and connected.
# Standard library only. Reads HEARTBEAT_SECRET (and optionally HEARTBEAT_URL) from the
# environment, or from a .env file next to this script or in the current folder.
import json, os, time, urllib.request
from pathlib import Path


def load_dotenv() -> None:
    for path in (Path(__file__).resolve().parent / ".env", Path.cwd() / ".env"):
        if not path.is_file():
            continue
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            value = value.split(" #", 1)[0].strip().strip('"').strip("'")
            os.environ.setdefault(key.strip(), value)


load_dotenv()

URL = os.environ.get("HEARTBEAT_URL", "https://bonavee.dev/api/heartbeat")
SECRET = os.environ["HEARTBEAT_SECRET"]
EVERY = 60  # seconds between heartbeats
RETRY = 15  # seconds before retrying after a failed send (no internet yet, site down)


def send() -> bool:
    try:
        body = json.dumps({"source": "laptop"}).encode()
        req = urllib.request.Request(URL, data=body, method="POST", headers={
            "Content-Type": "application/json", "Authorization": f"Bearer {SECRET}"})
        urllib.request.urlopen(req, timeout=10)
        return True
    except Exception:
        return False


# Wake every 5s and compare against the wall clock, so a heartbeat goes out within seconds
# of opening the laptop (sleep pauses the timer) or getting back online.
next_at = 0.0
while True:
    if time.time() >= next_at:
        next_at = time.time() + (EVERY if send() else RETRY)
    time.sleep(5)
