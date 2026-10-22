# Sends "I'm online" to bonavee.dev every 60s while this computer is on and connected.
# Standard library only. Reads HEARTBEAT_SECRET (and optionally HEARTBEAT_URL) from the
# environment, or from a .env file next to this script or in the current folder.
import json, os, time, urllib.request, subprocess, platform
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

def vscode_running() -> bool:
    try:
        if platform.system() == "Windows":
            # CREATE_NO_WINDOW stops a console flashing up every minute under pythonw.exe.
            out = subprocess.run(["tasklist"], capture_output=True, text=True,
                                 creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0)).stdout
            return "Code.exe" in out
        out = subprocess.run(["pgrep", "-f", "Visual Studio Code|/code"], capture_output=True, text=True).stdout
        return bool(out.strip())
    except Exception:
        return False

while True:
    try:
        body = json.dumps({"source": "laptop", "vscode": vscode_running()}).encode()
        req = urllib.request.Request(URL, data=body, method="POST", headers={
            "Content-Type": "application/json", "Authorization": f"Bearer {SECRET}"})
        urllib.request.urlopen(req, timeout=10)
    except Exception:
        pass  # offline or site down: try again next minute
    time.sleep(60)
