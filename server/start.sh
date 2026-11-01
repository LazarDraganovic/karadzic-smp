#!/usr/bin/env bash
cd "$(dirname "$0")"
java @user_jvm_args.txt @libraries/net/neoforged/neoforge/21.1.265/unix_args.txt nogui
