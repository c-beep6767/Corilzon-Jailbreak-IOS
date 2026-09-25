#!/usr/bin/env python3

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATABASE = ROOT / "data" / "packages.json"


def load_database():
    if not DATABASE.exists():
        return {"packages": []}

    try:
        return json.loads(DATABASE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {"packages": []}


def save_database(data):
    DATABASE.parent.mkdir(parents=True, exist_ok=True)
    DATABASE.write_text(
        json.dumps(data, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )


def list_packages():
    data = load_database()

    if not data["packages"]:
        print("Corilizon: nessun pacchetto registrato.")
        return

    for package in data["packages"]:
        print(
            f'{package.get("name", "Unknown")} '
            f'v{package.get("version", "0.0")} '
            f'[{package.get("type", "unknown")}]'
        )


def add_package(name, version, package_type):
    data = load_database()

    data["packages"].append({
        "name": name,
        "version": version,
        "type": package_type
    })

    save_database(data)
    print(f"Corilizon: aggiunto {name}.")


def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python corilizon_tool.py list")
        print("  python corilizon_tool.py add NAME VERSION TYPE")
        return

    command = sys.argv[1]

    if command == "list":
        list_packages()

    elif command == "add" and len(sys.argv) == 5:
        add_package(sys.argv[2], sys.argv[3], sys.argv[4])

    else:
        print("Comando non riconosciuto.")


if __name__ == "__main__":
    main()