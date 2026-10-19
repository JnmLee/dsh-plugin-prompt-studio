# Prompt Studio

**Author: Tokenav** · A DeepSeek Harness plugin for per-session system-prompt control.

Prompt Studio lets you keep a library of reusable system-prompt templates, choose one per session, append or replace the assembled prompt, and preview the result before the next model request.

## Install

### From GitHub

In DeepSeek Harness open **Settings → Plugins → Add plugin**, then paste the repository URL:

```text
https://github.com/JnmLee/dsh-plugin-prompt-studio
```

Or from a shell:

```bash
dsh plugin add github:JnmLee/dsh-plugin-prompt-studio
```

### From npm

The package name is `dsh-plugin-prompt-studio`. After an npm release:

```bash
dsh plugin add dsh-plugin-prompt-studio
```

> The GitHub route works today; the npm package is not published yet.

## Features

- **Append or replace** the assembled system prompt.
- **Template library** with names, operation modes, and editable content.
- **Built-in templates**: 先结论后理由 and 逆向专用.
- **Global defaults** for enablement and the default template.
- **Per-session overrides** for enablement and template selection.
- **Live preview** built from the latest assembled system prompt of a live session.
- **Theme aware**: the panel uses only `--dsw-alias-*` tokens, so it follows the harness light/dark theme.
- **Local only**: no model tools, no external services, no telemetry.

## Where it appears

- A `Prompt Studio` icon in the sidebar's global panel list opens the full workspace.
- A compact prompt icon in the composer tool row opens a per-session dialog for enablement, template selection, and preview. An accent dot marks an active prompt.

Changes apply to the next model request. The current turn is never rewritten.

## Built-in templates

| Name | Mode | Purpose |
|---|---|---|
| 先结论后理由 | Append | Concise, decision-first answers |
| 逆向专用 | Append | The stored reverse-engineering workbench charter |

Both can be edited or deleted in the panel. The default global setting is **disabled**; nothing changes until you enable a template for a session or as a global default.

## Storage

State is stored at `$DSH_HOME/prompt-studio/settings.json` (normally `~/.dsh/prompt-studio/settings.json`). Writes are atomic; the file holds global defaults, templates, and per-session overrides. It contains no credentials.

## Host/Client bridge

The browser half calls a plugin-owned `POST /prompt-studio/rpc` route. The route applies the harness's own browser request trust checks through `ctx.connection.requestRejection`, so the panel is reachable only from the authenticated local page.

## Prompt behavior

- Append: a scoped section with a very high order is added after the assembled sections.
- Replace: a scoped `complete` section makes the template the sole prompt section. Tools and runtime context are unaffected.

The plugin does not register model tools and never sends anything to a model by itself.

## Compatibility

Tested with DeepSeek Harness `0.2.1-rc.2` and its Web GUI. The package has no build step and no runtime dependencies.

## Development

```bash
git clone https://github.com/JnmLee/dsh-plugin-prompt-studio.git
cd dsh-plugin-prompt-studio
dsh plugin add .
```

## License

MIT © Tokenav
