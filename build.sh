#!/usr/bin/env bash

set -e

echo "=============================="
echo "     CORILIZON BUILD TOOL"
echo "=============================="

echo "[1/4] Checking repository..."
test -f index.html
test -f settings.html

echo "[2/4] Checking manifest..."
test -f manifest.json

echo "[3/4] Checking development tools..."
test -f tools/python/corilizon_tool.py
test -f tools/cpp/package_core.cpp
test -f tools/c/system_core.c
test -f tools/rust/corilizon_core.rs

echo "[4/4] Checking package database..."
test -f data/packages.json

echo
echo "Corilizon project structure: OK"