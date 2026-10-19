/**
 * Prompt Studio — Client half.
 *
 * A standalone main panel (global defaults, template library, live preview)
 * plus a compact per-session strip above the composer. All styling comes from
 * the host theme tokens, so light and dark follow the harness automatically.
 *
 * Author: Tokenav
 */
window.__ModuleLoader__.load({
  id: 'dsh-plugin-prompt-studio',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const EN = {
      panelTitle: 'Prompt Studio',
      panelSubtitle: 'Append or replace the system prompt, per session, with reusable templates and a live preview.',
      author: 'Tokenav',
      globalTitle: 'Global defaults',
      globalHint: 'New sessions inherit these settings. Each session can override them.',
      globalEnable: 'Enable by default',
      defaultTemplate: 'Default template',
      noDefaultTemplate: 'No template selected',
      templatesTitle: 'Template library',
      templatesHint: 'Append adds text after the assembled prompt. Replace makes the template the whole prompt.',
      newTemplate: 'New template',
      templateName: 'Template name',
      templateNamePlaceholder: 'e.g. Focused code review',
      mode: 'Operation',
      modeAppend: 'Append',
      modeReplace: 'Replace',
      modeAppendHint: 'Keeps the harness system prompt and adds this text at the end.',
      modeReplaceHint: 'Uses only this text as the system prompt. Tools and runtime context are unaffected.',
      content: 'Template content',
      contentPlaceholder: 'Write the system prompt text here…',
      chars: 'characters',
      save: 'Save template',
      saving: 'Saving…',
      saved: 'Saved',
      savedNext: 'Saved. Takes effect on the next model request.',
      delete: 'Delete',
      confirmDelete: 'Confirm delete',
      cancel: 'Cancel',
      setDefault: 'Set as default',
      isDefault: 'Default',
      builtin: 'Built-in',
      emptyTemplates: 'No templates yet. Create one to get started.',
      editorTitleNew: 'Create template',
      editorTitleEdit: 'Edit template',
      previewTitle: 'Live preview',
      previewHint: 'The preview uses the latest assembled system prompt of a live session.',
      refresh: 'Refresh',
      previewLoading: 'Building preview…',
      previewFailed: 'Preview failed',
      previewBase: 'Based on the latest system prompt of',
      previewNoBase: 'No original prompt available; showing the template text only.',
      previewSource: 'Show the original system prompt',
      previewEmpty: 'The resulting prompt is empty.',
      previewNote: 'Nothing is sent to the model from this panel. Changes apply to the next request.',
      sessionTitle: 'System prompt',
      sessionTitleShort: 'Prompt',
      sessionEnabled: 'Enabled',
      sessionDisabled: 'Off',
      sessionFollowGlobal: 'Follow global',
      sessionNoTemplate: 'No template selected. Open Prompt Studio to create one.',
      sessionManage: 'Manage templates',
      sessionTemplate: 'Template',
      sessionInheritOption: 'Follow global',
      retry: 'Retry',
      loadFailed: 'Could not load Prompt Studio',
      networkFailed: 'Cannot reach the Prompt Studio host service.',
      crash: 'This panel failed to render.',
      applyHint: 'Changes take effect on the next model request.',
      footer: 'Prompt Studio · made by Tokenav',
      sessionLoading: 'Loading…',
      sessionGlobal: 'Inherited from global defaults',
      sessionModalHint: 'Per-session override. Unset values follow the global defaults.',
      close: 'Close',
      sessionOverride: 'Session override',
      previewUnavailable: 'Preview is unavailable until the page reconnects.',
      globalStatusOn: 'On',
      globalStatusOff: 'Off',
      globalStatusNoTemplate: 'On · no template',
      noSessions: 'No live session',
    }

    const ZH = {
      panelTitle: '系统提示词工作台',
      panelSubtitle: '按会话追加或替换系统提示词，支持模板库、全局默认与实时预览。',
      author: 'Tokenav',
      globalTitle: '全局设置',
      globalHint: '新会话默认继承这里的设置，每个会话都可以单独覆盖。',
      globalEnable: '默认启用',
      defaultTemplate: '默认模板',
      noDefaultTemplate: '未选择模板',
      templatesTitle: '模板库',
      templatesHint: '追加：在已组装的提示词之后添加内容；替换：用模板整体替换系统提示词。',
      newTemplate: '新建模板',
      templateName: '模板名称',
      templateNamePlaceholder: '例如：严格代码审阅',
      mode: '操作方式',
      modeAppend: '追加',
      modeReplace: '替换',
      modeAppendHint: '保留 Harness 的系统提示词，并在末尾追加这段内容。',
      modeReplaceHint: '只用这段内容作为系统提示词；工具与运行时上下文不受影响。',
      content: '模板内容',
      contentPlaceholder: '在这里编写系统提示词…',
      chars: '字符',
      save: '保存模板',
      saving: '保存中…',
      saved: '已保存',
      savedNext: '已保存，将在下一次模型请求时生效。',
      delete: '删除',
      confirmDelete: '确认删除',
      cancel: '取消',
      setDefault: '设为默认',
      isDefault: '默认',
      builtin: '内置',
      emptyTemplates: '还没有模板，先创建一个吧。',
      editorTitleNew: '创建模板',
      editorTitleEdit: '编辑模板',
      previewTitle: '实时预览',
      previewHint: '预览以当前某个活跃会话最新一次组装的系统提示词为基准。',
      refresh: '刷新',
      previewLoading: '正在生成预览…',
      previewFailed: '预览失败',
      previewBase: '基准来自会话',
      previewNoBase: '没有可用的原始提示词，只显示模板内容。',
      previewSource: '查看原始系统提示词',
      previewEmpty: '最终提示词为空。',
      previewNote: '这个面板不会向模型发送任何内容，改动会在下一次请求时生效。',
      sessionTitle: '系统提示词',
      sessionTitleShort: '提示词',
      sessionEnabled: '已启用',
      sessionDisabled: '已关闭',
      sessionFollowGlobal: '跟随全局',
      sessionNoTemplate: '尚未选择模板。打开「系统提示词工作台」创建一个。',
      sessionManage: '管理模板',
      sessionTemplate: '模板',
      sessionInheritOption: '跟随全局',
      retry: '重试',
      loadFailed: '无法加载系统提示词工作台',
      networkFailed: '无法连接系统提示词宿主服务。',
      crash: '这个面板渲染失败了。',
      applyHint: '改动会在下一次模型请求时生效。',
      footer: '系统提示词工作台 · 作者 Tokenav',
      sessionLoading: '加载中…',
      sessionGlobal: '继承全局设置',
      sessionModalHint: '当前会话的独立设置；没有覆盖的项跟随全局默认。',
      close: '关闭',
      sessionOverride: '会话覆盖',
      previewUnavailable: '页面重新连接后才能预览。',
      globalStatusOn: '已开启',
      globalStatusOff: '已关闭',
      globalStatusNoTemplate: '已开启 · 未选择模板',
      noSessions: '暂无活跃会话',
    }

    const CSS = `
.psx-root{box-sizing:border-box;--psx-text:var(--dsw-alias-label-primary);--psx-muted:var(--dsw-alias-label-secondary);--psx-line:var(--dsw-alias-border-l1);--psx-line-strong:var(--dsw-alias-border-l2);--psx-surface:var(--dsw-alias-bg-layer-1);--psx-surface-2:var(--dsw-alias-bg-layer-2);--psx-accent:var(--dsw-alias-brand-primary);--psx-error:var(--dsw-alias-state-error-primary);--psx-warn:var(--dsw-alias-state-warn-primary);color:var(--psx-text);font-family:inherit}
.psx-root *,.psx-root *::before,.psx-root *::after{box-sizing:border-box}
.psx-page{height:100%;min-height:0;overflow:auto;background:var(--dsw-alias-bg-base)}
.psx-inner{width:100%;max-width:1120px;margin:0 auto;padding:28px 28px 72px}
.psx-hero{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px}
.psx-logo{flex:none;width:48px;height:48px;border-radius:15px;border:1px solid var(--psx-line);background:var(--psx-surface-2);display:grid;place-items:center;color:var(--psx-text)}
.psx-hero-copy{min-width:0;flex:1}
.psx-title{margin:0;font-size:22px;line-height:1.2;font-weight:650;letter-spacing:-.02em}
.psx-subtitle{margin:6px 0 0;color:var(--psx-muted);font-size:13px;line-height:1.55;max-width:62ch}
.psx-author{flex:none;display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border:1px solid var(--psx-line);border-radius:999px;background:var(--psx-surface);color:var(--psx-muted);font-size:11px;letter-spacing:.02em}
.psx-author-dot{width:6px;height:6px;border-radius:50%;background:var(--psx-accent)}
.psx-card{border:1px solid var(--psx-line);background:var(--psx-surface);border-radius:14px;padding:16px}
.psx-card-head{display:flex;align-items:flex-start;gap:12px;justify-content:space-between}
.psx-h2{margin:0;font-size:14px;font-weight:650;letter-spacing:-.01em}
.psx-h3{margin:0;font-size:13px;font-weight:650}
.psx-hint{margin:5px 0 0;color:var(--psx-muted);font-size:12px;line-height:1.55}
.psx-grid{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(300px,.88fr);gap:18px;align-items:start;margin-top:18px}
.psx-preview{position:sticky;top:16px;min-width:0}
.psx-grow{flex:1;min-width:0}
.psx-global-row{display:flex;align-items:flex-end;gap:16px;margin-top:14px;flex-wrap:wrap}
.psx-global-status{display:flex;align-items:center;gap:7px;height:34px;padding:0 11px;border-radius:9px;border:1px solid var(--psx-line);background:var(--psx-surface-2);color:var(--psx-muted);font-size:12px;white-space:nowrap}
.psx-status-dot{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-idle-primary)}
.psx-status-dot.on{background:var(--dsw-alias-state-success-primary)}
.psx-field{display:flex;flex-direction:column;gap:6px;min-width:0}
.psx-label{font-size:10.5px;font-weight:650;letter-spacing:.07em;text-transform:uppercase;color:var(--psx-muted)}
.psx-input,.psx-select,.psx-textarea{width:100%;border:1px solid var(--psx-line);border-radius:9px;background:var(--psx-surface-2);color:var(--psx-text);font:inherit;font-size:12.5px;padding:8px 10px;outline:none;transition:border-color .15s ease,box-shadow .15s ease}
.psx-input{height:34px}
.psx-select{height:34px;cursor:pointer}
.psx-textarea{min-height:250px;resize:vertical;line-height:1.65;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;font-size:12px}
.psx-input:focus,.psx-select:focus,.psx-textarea:focus{border-color:var(--psx-accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--psx-accent) 20%,transparent)}
.psx-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 12px;border:1px solid var(--psx-line);border-radius:9px;background:var(--psx-surface-2);color:var(--psx-text);font:inherit;font-size:12px;font-weight:550;cursor:pointer;white-space:nowrap;transition:background .15s ease,border-color .15s ease,opacity .15s ease}
.psx-btn:hover:not(:disabled){border-color:var(--psx-line-strong);background:color-mix(in srgb,var(--psx-text) 6%,var(--psx-surface-2))}
.psx-btn:disabled{opacity:.45;cursor:not-allowed}
.psx-btn-primary{background:var(--psx-accent);border-color:transparent;color:var(--dsw-alias-bg-base)}
.psx-btn-primary:hover:not(:disabled){background:var(--psx-accent);border-color:transparent;filter:brightness(1.07)}
.psx-btn-ghost{background:transparent;border-color:transparent;color:var(--psx-muted)}
.psx-btn-ghost:hover:not(:disabled){background:color-mix(in srgb,var(--psx-text) 7%,transparent);border-color:transparent;color:var(--psx-text)}
.psx-btn-danger{color:var(--psx-error);border-color:color-mix(in srgb,var(--psx-error) 35%,var(--psx-line))}
.psx-btn-danger:hover:not(:disabled){background:color-mix(in srgb,var(--psx-error) 10%,transparent);border-color:var(--psx-error)}
.psx-switch{position:relative;flex:none;width:38px;height:22px;padding:0;border:1px solid var(--psx-line);border-radius:999px;background:var(--psx-surface-2);cursor:pointer;transition:background .16s ease,border-color .16s ease}
.psx-switch:disabled{opacity:.45;cursor:not-allowed}
.psx-switch-thumb{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--psx-muted);transition:transform .16s ease,background .16s ease}
.psx-switch.is-on{background:var(--psx-accent);border-color:transparent}
.psx-switch.is-on .psx-switch-thumb{transform:translateX(16px);background:var(--dsw-alias-bg-base)}
.psx-switch:focus-visible{outline:2px solid color-mix(in srgb,var(--psx-accent) 55%,transparent);outline-offset:2px}
.psx-list{display:flex;flex-direction:column;gap:8px;margin-top:14px;max-height:286px;overflow:auto;padding-right:2px}
.psx-item{display:flex;align-items:center;gap:10px;width:100%;padding:9px 11px;border:1px solid var(--psx-line);border-radius:10px;background:var(--psx-surface-2);color:var(--psx-text);text-align:left;font:inherit;cursor:pointer;transition:border-color .15s ease,background .15s ease}
.psx-item:hover{border-color:var(--psx-line-strong)}
.psx-item.is-active{border-color:color-mix(in srgb,var(--psx-accent) 60%,var(--psx-line));background:color-mix(in srgb,var(--psx-accent) 8%,var(--psx-surface-2))}
.psx-item-copy{min-width:0;flex:1}
.psx-item-name{display:block;font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.psx-item-text{display:block;margin-top:3px;color:var(--psx-muted);font-size:11px;line-height:1.45;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.psx-chips{display:flex;align-items:center;gap:5px;flex-wrap:wrap}
.psx-chip{display:inline-flex;align-items:center;height:20px;padding:0 7px;border-radius:6px;border:1px solid var(--psx-line);background:var(--psx-surface);color:var(--psx-muted);font-size:10.5px;font-weight:600;letter-spacing:.02em;white-space:nowrap}
.psx-chip.is-accent{color:var(--psx-accent);border-color:color-mix(in srgb,var(--psx-accent) 40%,var(--psx-line));background:color-mix(in srgb,var(--psx-accent) 9%,transparent)}
.psx-chip.is-on{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 35%,var(--psx-line));background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent)}
.psx-divider{height:1px;background:var(--psx-line);margin:16px 0}
.psx-editor-head{display:flex;align-items:center;gap:8px;justify-content:space-between;margin-bottom:12px}
.psx-editor-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}
.psx-seg{display:inline-flex;gap:3px;padding:3px;border:1px solid var(--psx-line);border-radius:9px;background:var(--psx-surface-2);height:34px}
.psx-seg button{flex:1;min-width:0;padding:0 12px;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--psx-muted);font:inherit;font-size:11.5px;font-weight:600;cursor:pointer}
.psx-seg button.is-on{background:var(--psx-surface);border-color:var(--psx-line-strong);color:var(--psx-text)}
.psx-mode-hint{margin-top:7px;font-size:11px;line-height:1.5;color:var(--psx-muted)}
.psx-editor-foot{display:flex;align-items:center;gap:10px;margin-top:12px;flex-wrap:wrap}
.psx-count{font-size:11px;color:var(--psx-muted);font-variant-numeric:tabular-nums}
.psx-spacer{flex:1}
.psx-preview-meta{display:flex;align-items:flex-start;gap:7px;margin:14px 0 8px;color:var(--psx-muted);font-size:11px;line-height:1.5}
.psx-meta-dot{flex:none;width:6px;height:6px;margin-top:5px;border-radius:50%;background:var(--psx-accent)}
.psx-pre{margin:0;padding:13px;max-height:420px;overflow:auto;border:1px solid var(--psx-line);border-radius:10px;background:var(--psx-surface-2);color:var(--psx-text);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;font-size:11.5px;line-height:1.65;white-space:pre-wrap;word-break:break-word}
.psx-pre-base{max-height:230px;color:var(--psx-muted)}
.psx-details{margin-top:10px}
.psx-details summary{cursor:pointer;color:var(--psx-muted);font-size:11px;user-select:none}
.psx-details[open] summary{margin-bottom:8px}
.psx-empty{margin-top:14px;padding:22px 14px;border:1px dashed var(--psx-line-strong);border-radius:10px;color:var(--psx-muted);font-size:12px;line-height:1.6;text-align:center}
.psx-error{margin-top:14px;padding:11px 12px;border:1px solid color-mix(in srgb,var(--psx-error) 40%,var(--psx-line));border-radius:10px;background:color-mix(in srgb,var(--psx-error) 7%,transparent);color:var(--psx-error);font-size:12px;line-height:1.55;overflow-wrap:anywhere}
.psx-footnote{margin:12px 2px 0;color:var(--psx-muted);font-size:10.5px;line-height:1.55}
.psx-footer{margin-top:26px;padding-top:14px;border-top:1px solid var(--psx-line);color:var(--psx-muted);font-size:10.5px;letter-spacing:.02em}
.psx-crash{padding:24px;color:var(--psx-text)}
.psx-crash pre{margin-top:10px;padding:10px;border:1px solid var(--psx-line);border-radius:8px;background:var(--psx-surface-2);white-space:pre-wrap;font-size:11px}
.psx-trigger{position:relative;display:inline-grid;place-items:center;flex:none;width:28px;height:28px;padding:0;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--psx-muted);cursor:pointer;transition:background .15s ease,color .15s ease}
.psx-trigger:hover{background:color-mix(in srgb,var(--psx-text) 7%,transparent);color:var(--psx-text)}
.psx-trigger.is-on{color:var(--psx-accent)}
.psx-trigger-dot{position:absolute;top:2px;right:2px;width:5px;height:5px;border-radius:50%;background:var(--psx-accent)}
.psx-mini-icon{display:inline-flex;flex:none;color:var(--psx-accent)}
.psx-icon-btn{display:inline-grid;place-items:center;flex:none;width:26px;height:26px;padding:0;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--psx-muted);cursor:pointer}
.psx-icon-btn:hover{background:color-mix(in srgb,var(--psx-text) 7%,transparent);color:var(--psx-text)}
.psx-overlay{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:24px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 62%,transparent);backdrop-filter:blur(3px);pointer-events:auto}
.psx-modal{width:min(560px,100%);max-height:min(82vh,760px);overflow:auto;padding:18px 20px 14px;border:1px solid var(--psx-line-strong);border-radius:16px;background:var(--dsw-alias-bg-overlay);box-shadow:0 16px 60px color-mix(in srgb,var(--dsw-alias-bg-base) 55%,transparent)}
.psx-modal-head{display:flex;align-items:flex-start;gap:10px;margin-bottom:14px}
.psx-modal-title{margin:0;font-size:16px;font-weight:650;letter-spacing:-.01em}
.psx-modal-head .psx-icon-btn{margin-left:auto}
.psx-modal-body{display:flex;flex-direction:column;gap:12px}
.psx-modal-body .psx-field{margin-top:0}
.psx-modal-body .psx-empty{margin-top:0}
.psx-modal-body .psx-pre{max-height:260px}
.psx-modal-note{color:var(--psx-muted);font-size:11.5px;line-height:1.5}
.psx-modal-section-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:2px}
.psx-modal-foot{display:flex;align-items:center;gap:8px;margin-top:16px;padding-top:12px;border-top:1px solid var(--psx-line)}
.psx-row{display:flex;align-items:center;gap:10px;min-width:0;flex-wrap:wrap}
.psx-modal .psx-select{height:36px}
@media (max-width:980px){.psx-grid{grid-template-columns:minmax(0,1fr)}.psx-preview{position:static}.psx-inner{padding:22px 18px 56px}.psx-editor-grid{grid-template-columns:minmax(0,1fr)}}
@media (max-width:560px){.psx-hero{flex-wrap:wrap}.psx-author{margin-left:62px}.psx-overlay{padding:12px}.psx-modal{max-height:88vh;padding:16px}}
`

    const BLANK = { id: null, name: '', mode: 'append', text: '' }

    function shortId(id) {
      return typeof id === 'string' && id.length > 10 ? `${id.slice(0, 8)}…` : String(id ?? '')
    }

    function createStore(rpc, t) {
      return {
        bootstrap: null,
        bootstrapError: null,
        loadingBootstrap: false,
        sessions: new Map(),
        listeners: new Set(),
        invalidation: 0,
        modal: { open: false, sessionId: null },
        openModal(sessionId) {
          this.modal = { open: true, sessionId }
          this.notify()
        },
        closeModal() {
          if (!this.modal.open) return
          this.modal = { open: false, sessionId: null }
          this.notify()
        },
        subscribe(listener) {
          this.listeners.add(listener)
          return () => this.listeners.delete(listener)
        },
        notify() {
          for (const listener of [...this.listeners]) {
            try {
              listener()
            } catch (error) {
              console.error('[prompt-studio] listener failed', error)
            }
          }
        },
        async loadBootstrap() {
          if (this.loadingBootstrap) return
          this.loadingBootstrap = true
          this.bootstrapError = null
          this.notify()
          try {
            const value = await rpc('bootstrap')
            this.bootstrap = value.bootstrap
            this.bootstrapError = null
          } catch (error) {
            this.bootstrapError = error?.message ?? t('networkFailed')
          } finally {
            this.loadingBootstrap = false
            this.notify()
          }
        },
        async loadSession(sessionId) {
          const previous = this.sessions.get(sessionId)
          if (previous && previous.rev === this.invalidation && (previous.data || previous.error)) return
          this.sessions.set(sessionId, {
            loading: true,
            rev: this.invalidation,
            data: previous?.data ?? null,
            error: null,
          })
          this.notify()
          try {
            const value = await rpc('session', { sessionId })
            this.sessions.set(sessionId, {
              loading: false,
              rev: this.invalidation,
              data: value.session,
              error: null,
            })
          } catch (error) {
            this.sessions.set(sessionId, {
              loading: false,
              rev: this.invalidation,
              data: null,
              error: error?.message ?? t('networkFailed'),
            })
          }
          this.notify()
        },
        invalidateSessions() {
          this.invalidation += 1
          this.sessions.clear()
          this.notify()
        },
        async saveGlobal(patch) {
          const value = await rpc('saveGlobal', patch)
          this.bootstrap = value.bootstrap
          this.bootstrapError = null
          this.invalidateSessions()
          return value
        },
        async saveSession(sessionId, patch) {
          const value = await rpc('saveSession', { sessionId, ...patch })
          this.bootstrap = value.bootstrap
          this.sessions.set(sessionId, {
            loading: false,
            rev: this.invalidation,
            data: value.session,
            error: null,
          })
          this.notify()
          return value
        },
        async saveTemplate(template) {
          const value = await rpc('saveTemplate', template)
          this.bootstrap = value.bootstrap
          this.bootstrapError = null
          this.invalidateSessions()
          return value
        },
        async deleteTemplate(id) {
          const value = await rpc('deleteTemplate', { id })
          this.bootstrap = value.bootstrap
          this.bootstrapError = null
          this.invalidateSessions()
          return value
        },
        async preview(params) {
          const value = await rpc('preview', params)
          return value.preview
        },
      }
    }

    return {
      inject: ['slots', 'locale', 'layout'],
      apply(ctx) {
        const t = ctx.locale.bind('prompt-studio')
        for (const locale of ['en', 'en-US']) {
          ctx.effect(() => ctx.locale.register('prompt-studio', locale, EN))
        }
        for (const locale of ['zh', 'zh-CN', 'zh-Hans']) {
          ctx.effect(() => ctx.locale.register('prompt-studio', locale, ZH))
        }

        async function rpc(method, params) {
          let response
          try {
            response = await fetch('prompt-studio/rpc', {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ method, params: params ?? {} }),
            })
          } catch {
            throw new Error(t('networkFailed'))
          }
          let payload = null
          try {
            payload = await response.json()
          } catch {
            // Fall through to the status-based error.
          }
          if (!response.ok || !payload || payload.ok !== true) {
            const message = payload?.error?.message || `${response.status} ${response.statusText}`
            const error = new Error(message)
            error.code = payload?.error?.code
            throw error
          }
          return payload.value
        }

        const store = createStore(rpc, t)

        function useLocaleTick() {
          const [, force] = React.useState(0)
          React.useEffect(() => ctx.locale.subscribe(() => force((value) => value + 1)), [])
        }

        function useStoreRevision() {
          const [revision, setRevision] = React.useState(0)
          React.useEffect(() => store.subscribe(() => setRevision((value) => value + 1)), [])
          return revision
        }

        function Styles() {
          return h('style', { 'data-prompt-studio': '', dangerouslySetInnerHTML: { __html: CSS } })
        }

        class Boundary extends React.Component {
          constructor(props) {
            super(props)
            this.state = { error: null }
          }
          static getDerivedStateFromError(error) {
            return { error }
          }
          render() {
            if (this.state.error) {
              return h(
                'div',
                { className: 'psx-root psx-crash' },
                h('strong', null, t('crash')),
                h('pre', null, String(this.state.error?.message ?? this.state.error)),
              )
            }
            return this.props.children
          }
        }

        function BrandGlyph({ size = 26 }) {
          return h(
            'svg',
            {
              width: size,
              height: size,
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: 1.7,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              'aria-hidden': 'true',
            },
            h('path', { d: 'M8.2 4 3.6 12l4.6 8' }),
            h('path', { d: 'M15.8 4l4.6 8-4.6 8' }),
            h('path', { d: 'M13.3 5.4 10.7 18.6', opacity: 0.45 }),
          )
        }

        function Switch({ checked, onChange, disabled, label }) {
          return h(
            'button',
            {
              type: 'button',
              role: 'switch',
              'aria-checked': checked ? 'true' : 'false',
              'aria-label': label,
              title: label,
              disabled: Boolean(disabled),
              className: `psx-switch${checked ? ' is-on' : ''}`,
              onClick: () => onChange(!checked),
            },
            h('span', { className: 'psx-switch-thumb' }),
          )
        }

        function PanelIcon({ size = 18, active = false }) {
          return h(
            'svg',
            {
              width: size,
              height: size,
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: active ? 2 : 1.7,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              'aria-hidden': 'true',
              focusable: 'false',
              style: { display: 'block' },
            },
            h('path', { d: 'M8.2 4 3.6 12l4.6 8' }),
            h('path', { d: 'M15.8 4l4.6 8-4.6 8' }),
            h('path', { d: 'M13.3 5.4 10.7 18.6', opacity: 0.45 }),
          )
        }

        function Panel() {
          useLocaleTick()
          const revision = useStoreRevision()
          const bootstrap = store.bootstrap
          const [draft, setDraft] = React.useState(null)
          const [saving, setSaving] = React.useState(false)
          const [status, setStatus] = React.useState(null)
          const [confirming, setConfirming] = React.useState(null)
          const [preview, setPreview] = React.useState({ loading: false, data: null, error: null })
          const previewSeq = React.useRef(0)

          React.useEffect(() => {
            if (!store.bootstrap && !store.bootstrapError) void store.loadBootstrap()
          }, [revision])

          React.useEffect(() => {
            if (!status) return undefined
            const timer = setTimeout(() => setStatus(null), 2800)
            return () => clearTimeout(timer)
          }, [status])

          React.useEffect(() => {
            if (!bootstrap || draft) return
            const template = bootstrap.templates.find((item) => item.id === bootstrap.global.templateId)
              ?? bootstrap.templates[0]
            setDraft(template ? { ...template } : { ...BLANK })
          }, [bootstrap, draft])

          function refreshPreview(nextDraft) {
            if (!nextDraft) return
            const sequence = previewSeq.current + 1
            previewSeq.current = sequence
            setPreview((current) => ({ loading: true, data: current.data, error: null }))
            store
              .preview({ mode: nextDraft.mode, text: nextDraft.text })
              .then((data) => {
                if (previewSeq.current === sequence) setPreview({ loading: false, data, error: null })
              })
              .catch((error) => {
                if (previewSeq.current === sequence) {
                  setPreview({ loading: false, data: null, error: error?.message ?? t('networkFailed') })
                }
              })
          }

          React.useEffect(() => {
            if (!draft) return undefined
            const timer = setTimeout(() => refreshPreview(draft), 450)
            return () => clearTimeout(timer)
          }, [draft?.mode, draft?.text, bootstrap?.global.enabled, bootstrap?.global.templateId])

          function selectTemplate(template) {
            setDraft({ ...template })
            setConfirming(null)
          }

          async function toggleGlobal(enabled) {
            try {
              await store.saveGlobal({
                enabled,
                templateId: store.bootstrap?.global.templateId ?? null,
              })
            } catch (error) {
              setStatus({ kind: 'error', text: error?.message ?? t('networkFailed') })
            }
          }

          async function chooseDefault(templateId) {
            try {
              await store.saveGlobal({
                enabled: store.bootstrap?.global.enabled ?? false,
                templateId: templateId || null,
              })
            } catch (error) {
              setStatus({ kind: 'error', text: error?.message ?? t('networkFailed') })
            }
          }

          async function saveDraft() {
            if (!draft || !draft.name.trim()) return
            setSaving(true)
            setStatus(null)
            try {
              const value = await store.saveTemplate({
                id: draft.id,
                name: draft.name,
                mode: draft.mode,
                text: draft.text,
              })
              const saved = value.bootstrap.templates.find((item) => item.id === value.savedId)
              if (saved) setDraft({ ...saved })
              setConfirming(null)
              setStatus({ kind: 'ok', text: t('savedNext') })
            } catch (error) {
              setStatus({ kind: 'error', text: error?.message ?? t('networkFailed') })
            } finally {
              setSaving(false)
            }
          }

          async function removeDraft() {
            if (!draft?.id) return
            try {
              const value = await store.deleteTemplate(draft.id)
              const next = value.bootstrap.templates[0]
              setDraft(next ? { ...next } : { ...BLANK })
              setConfirming(null)
              setStatus({ kind: 'ok', text: t('saved') })
            } catch (error) {
              setStatus({ kind: 'error', text: error?.message ?? t('networkFailed') })
            }
          }

          async function makeDefault() {
            if (!draft?.id) return
            try {
              await store.saveGlobal({
                enabled: store.bootstrap?.global.enabled ?? false,
                templateId: draft.id,
              })
              setStatus({ kind: 'ok', text: t('saved') })
            } catch (error) {
              setStatus({ kind: 'error', text: error?.message ?? t('networkFailed') })
            }
          }

          const defaultTemplate = bootstrap?.templates.find((item) => item.id === bootstrap.global.templateId)
          const effectiveTemplate = draft
            ? bootstrap?.templates.find((item) => item.id === draft.id)
            : null

          const page = (content) =>
            h(
              'div',
              { className: 'psx-root psx-page' },
              h(Styles),
              h(
                'div',
                { className: 'psx-inner' },
                h(
                  'header',
                  { className: 'psx-hero' },
                  h('div', { className: 'psx-logo' }, h(BrandGlyph, { size: 26 })),
                  h(
                    'div',
                    { className: 'psx-hero-copy' },
                    h('h1', { className: 'psx-title' }, t('panelTitle')),
                    h('p', { className: 'psx-subtitle' }, t('panelSubtitle')),
                  ),
                  h(
                    'span',
                    { className: 'psx-author', title: `by ${t('author')}` },
                    h('span', { className: 'psx-author-dot' }),
                    t('author'),
                  ),
                ),
                content,
                h('footer', { className: 'psx-footer' }, t('footer')),
              ),
            )

          if (!bootstrap) {
            if (store.bootstrapError) {
              return page(
                h(
                  'section',
                  { className: 'psx-card' },
                  h('h2', { className: 'psx-h2' }, t('loadFailed')),
                  h('div', { className: 'psx-error' }, store.bootstrapError),
                  h(
                    'div',
                    { style: { marginTop: 12 } },
                    h(
                      'button',
                      { type: 'button', className: 'psx-btn', onClick: () => void store.loadBootstrap() },
                      t('retry'),
                    ),
                  ),
                ),
              )
            }
            return page(h('div', { className: 'psx-empty' }, t('sessionLoading')))
          }

          return page(
            h(
              React.Fragment,
              null,
              h(
                'section',
                { className: 'psx-card' },
                h(
                  'div',
                  { className: 'psx-card-head' },
                  h(
                    'div',
                    { className: 'psx-grow' },
                    h('h2', { className: 'psx-h2' }, t('globalTitle')),
                    h('p', { className: 'psx-hint' }, t('globalHint')),
                  ),
                  h(Switch, {
                    checked: bootstrap.global.enabled,
                    label: t('globalEnable'),
                    onChange: (value) => void toggleGlobal(value),
                  }),
                ),
                h(
                  'div',
                  { className: 'psx-global-row' },
                  h(
                    'label',
                    { className: 'psx-field psx-grow' },
                    h('span', { className: 'psx-label' }, t('defaultTemplate')),
                    h(
                      'select',
                      {
                        className: 'psx-select',
                        value: bootstrap.global.templateId ?? '',
                        onChange: (event) => void chooseDefault(event.target.value),
                      },
                      h('option', { value: '' }, t('noDefaultTemplate')),
                      bootstrap.templates.map((template) =>
                        h(
                          'option',
                          { key: template.id, value: template.id },
                          `${template.name} · ${template.mode === 'replace' ? t('modeReplace') : t('modeAppend')}`,
                        ),
                      ),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'psx-global-status' },
                    h('span', {
                      className: `psx-status-dot${bootstrap.global.enabled && defaultTemplate ? ' on' : ''}`,
                    }),
                    bootstrap.global.enabled && defaultTemplate
                      ? `${t('globalStatusOn')} · ${defaultTemplate.mode === 'replace' ? t('modeReplace') : t('modeAppend')}`
                      : bootstrap.global.enabled
                        ? t('globalStatusNoTemplate')
                        : t('globalStatusOff'),
                  ),
                ),
              ),
              h(
                'div',
                { className: 'psx-grid' },
                h(
                  'section',
                  { className: 'psx-card' },
                  h(
                    'div',
                    { className: 'psx-card-head' },
                    h(
                      'div',
                      { className: 'psx-grow' },
                      h('h2', { className: 'psx-h2' }, t('templatesTitle')),
                      h('p', { className: 'psx-hint' }, t('templatesHint')),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'psx-btn',
                        onClick: () => {
                          setDraft({ ...BLANK })
                          setConfirming(null)
                        },
                      },
                      `+ ${t('newTemplate')}`,
                    ),
                  ),
                  bootstrap.templates.length === 0
                    ? h('div', { className: 'psx-empty' }, t('emptyTemplates'))
                    : h(
                        'div',
                        { className: 'psx-list' },
                        bootstrap.templates.map((template) =>
                          h(
                            'button',
                            {
                              type: 'button',
                              key: template.id,
                              className: `psx-item${draft?.id === template.id ? ' is-active' : ''}`,
                              onClick: () => selectTemplate(template),
                            },
                            h(
                              'span',
                              { className: 'psx-item-copy' },
                              h('span', { className: 'psx-item-name' }, template.name),
                              h(
                                'span',
                                { className: 'psx-item-text' },
                                template.text.trim() || t('previewEmpty'),
                              ),
                            ),
                            h(
                              'span',
                              { className: 'psx-chips' },
                              template.id === bootstrap.global.templateId
                                ? h('span', { className: 'psx-chip is-accent' }, t('isDefault'))
                                : null,
                              h(
                                'span',
                                { className: 'psx-chip' },
                                template.mode === 'replace' ? t('modeReplace') : t('modeAppend'),
                              ),
                              template.builtin ? h('span', { className: 'psx-chip' }, t('builtin')) : null,
                            ),
                          ),
                        ),
                      ),
                  h('div', { className: 'psx-divider' }),
                  draft
                    ? h(
                        'div',
                        null,
                        h(
                          'div',
                          { className: 'psx-editor-head' },
                          h(
                            'h3',
                            { className: 'psx-h3' },
                            draft.id ? t('editorTitleEdit') : t('editorTitleNew'),
                          ),
                          effectiveTemplate
                            ? h(
                                'span',
                                { className: 'psx-chips' },
                                effectiveTemplate.mode === 'replace'
                                  ? h('span', { className: 'psx-chip' }, t('modeReplace'))
                                  : h('span', { className: 'psx-chip' }, t('modeAppend')),
                                effectiveTemplate.builtin ? h('span', { className: 'psx-chip' }, t('builtin')) : null,
                              )
                            : null,
                        ),
                        h(
                          'div',
                          { className: 'psx-editor-grid' },
                          h(
                            'label',
                            { className: 'psx-field' },
                            h('span', { className: 'psx-label' }, t('templateName')),
                            h('input', {
                              className: 'psx-input',
                              value: draft.name,
                              placeholder: t('templateNamePlaceholder'),
                              maxLength: 80,
                              onChange: (event) => setDraft({ ...draft, name: event.target.value }),
                            }),
                          ),
                          h(
                            'div',
                            { className: 'psx-field' },
                            h('span', { className: 'psx-label' }, t('mode')),
                            h(
                              'div',
                              { className: 'psx-seg' },
                              h(
                                'button',
                                {
                                  type: 'button',
                                  className: draft.mode === 'append' ? 'is-on' : '',
                                  onClick: () => setDraft({ ...draft, mode: 'append' }),
                                },
                                t('modeAppend'),
                              ),
                              h(
                                'button',
                                {
                                  type: 'button',
                                  className: draft.mode === 'replace' ? 'is-on' : '',
                                  onClick: () => setDraft({ ...draft, mode: 'replace' }),
                                },
                                t('modeReplace'),
                              ),
                            ),
                          ),
                        ),
                        h(
                          'p',
                          { className: 'psx-mode-hint' },
                          draft.mode === 'replace' ? t('modeReplaceHint') : t('modeAppendHint'),
                        ),
                        h(
                          'label',
                          { className: 'psx-field', style: { marginTop: 14 } },
                          h('span', { className: 'psx-label' }, t('content')),
                          h('textarea', {
                            className: 'psx-textarea',
                            value: draft.text,
                            placeholder: t('contentPlaceholder'),
                            spellCheck: false,
                            onChange: (event) => setDraft({ ...draft, text: event.target.value }),
                          }),
                        ),
                        h(
                          'div',
                          { className: 'psx-editor-foot' },
                          h('span', { className: 'psx-count' }, `${draft.text.length} ${t('chars')}`),
                          h('span', { className: 'psx-spacer' }),
                          draft.id
                            ? h(
                                'button',
                                {
                                  type: 'button',
                                  className: 'psx-btn psx-btn-ghost',
                                  onClick: () => void makeDefault(),
                                },
                                t('setDefault'),
                              )
                            : null,
                          draft.id
                            ? confirming === draft.id
                              ? h(
                                  React.Fragment,
                                  null,
                                  h(
                                    'button',
                                    {
                                      type: 'button',
                                      className: 'psx-btn psx-btn-danger',
                                      onClick: () => void removeDraft(),
                                    },
                                    t('confirmDelete'),
                                  ),
                                  h(
                                    'button',
                                    {
                                      type: 'button',
                                      className: 'psx-btn psx-btn-ghost',
                                      onClick: () => setConfirming(null),
                                    },
                                    t('cancel'),
                                  ),
                                )
                              : h(
                                  'button',
                                  {
                                    type: 'button',
                                    className: 'psx-btn psx-btn-danger',
                                    onClick: () => setConfirming(draft.id),
                                  },
                                  t('delete'),
                                )
                            : null,
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'psx-btn psx-btn-primary',
                              disabled: saving || !draft.name.trim(),
                              onClick: () => void saveDraft(),
                            },
                            saving ? t('saving') : t('save'),
                          ),
                        ),
                        status
                          ? h(
                              'div',
                              { className: status.kind === 'error' ? 'psx-error' : 'psx-hint', style: { marginTop: 10 } },
                              status.text,
                            )
                          : null,
                      )
                    : null,
                ),
                h(
                  'aside',
                  { className: 'psx-preview' },
                  h(
                    'section',
                    { className: 'psx-card' },
                    h(
                      'div',
                      { className: 'psx-card-head' },
                      h(
                        'div',
                        { className: 'psx-grow' },
                        h('h2', { className: 'psx-h2' }, t('previewTitle')),
                        h('p', { className: 'psx-hint' }, t('previewHint')),
                      ),
                      h(
                        'button',
                        {
                          type: 'button',
                          className: 'psx-btn',
                          disabled: preview.loading || !draft,
                          onClick: () => refreshPreview(draft),
                        },
                        preview.loading ? t('previewLoading') : t('refresh'),
                      ),
                    ),
                    preview.error
                      ? h('div', { className: 'psx-error' }, `${t('previewFailed')}: ${preview.error}`)
                      : preview.data
                        ? h(
                            React.Fragment,
                            null,
                            h(
                              'div',
                              { className: 'psx-preview-meta' },
                              h('span', { className: 'psx-meta-dot' }),
                              preview.data.hasBase
                                ? `${t('previewBase')} ${
                                    preview.data.sessionTitle || shortId(preview.data.sessionId)
                                  }`
                                : t('previewNoBase'),
                            ),
                            h(
                              'pre',
                              { className: 'psx-pre' },
                              preview.data.result.trim() ? preview.data.result : t('previewEmpty'),
                            ),
                            preview.data.hasBase
                              ? h(
                                  'details',
                                  { className: 'psx-details' },
                                  h('summary', null, t('previewSource')),
                                  h('pre', { className: 'psx-pre psx-pre-base' }, preview.data.base),
                                )
                              : null,
                          )
                        : h(
                            'div',
                            { className: 'psx-empty' },
                            preview.loading ? t('previewLoading') : t('previewHint'),
                          ),
                  ),
                  h('p', { className: 'psx-footnote' }, t('previewNote')),
                ),
              ),
              h('p', { className: 'psx-footnote' }, t('applyHint')),
            ),
          )
        }

        function SessionTrigger(props) {
          useLocaleTick()
          const revision = useStoreRevision()
          const sessionId = props.sessionId
          React.useEffect(() => {
            if (!sessionId) return
            const entry = store.sessions.get(sessionId)
            if (!entry || entry.rev !== store.invalidation) void store.loadSession(sessionId)
          }, [sessionId, revision])
          const data = sessionId ? store.sessions.get(sessionId)?.data : null
          const active = Boolean(data?.effective?.active)
          if (!sessionId) return null
          return h(
            React.Fragment,
            null,
            h(Styles),
            h(
              'button',
              {
                type: 'button',
                className: `psx-root psx-trigger${active ? ' is-on' : ''}`,
                title: `${t('sessionTitle')} · ${active ? t('sessionEnabled') : t('sessionDisabled')}`,
                'aria-label': t('sessionTitle'),
                'aria-haspopup': 'dialog',
                onClick: () => store.openModal(sessionId),
              },
              h(BrandGlyph, { size: 15 }),
              active ? h('span', { className: 'psx-trigger-dot' }) : null,
            ),
          )
        }

        function SessionModal() {
          useLocaleTick()
          useStoreRevision()
          const { open, sessionId } = store.modal
          const [busy, setBusy] = React.useState(false)
          const [error, setError] = React.useState(null)
          const [preview, setPreview] = React.useState({ loading: false, data: null, error: null })
          const previewSeq = React.useRef(0)

          React.useEffect(() => {
            if (!open || !sessionId) return undefined
            const onKey = (event) => {
              if (event.key === 'Escape') store.closeModal()
            }
            document.addEventListener('keydown', onKey)
            void store.loadSession(sessionId)
            return () => document.removeEventListener('keydown', onKey)
          }, [open, sessionId])

          const entry = open && sessionId ? store.sessions.get(sessionId) : null
          const data = entry?.data
          const effective = data?.effective
          const override = data?.override

          function refreshPreview() {
            if (!effective?.hasTemplate || !sessionId) return
            const sequence = previewSeq.current + 1
            previewSeq.current = sequence
            setPreview({ loading: true, data: null, error: null })
            store
              .preview({ sessionId, mode: effective.mode, text: effective.text })
              .then((value) => {
                if (previewSeq.current === sequence) setPreview({ loading: false, data: value, error: null })
              })
              .catch((value) => {
                if (previewSeq.current === sequence) {
                  setPreview({ loading: false, data: null, error: value?.message ?? t('networkFailed') })
                }
              })
          }

          React.useEffect(() => {
            if (!open || !effective?.hasTemplate) {
              setPreview({ loading: false, data: null, error: null })
              return undefined
            }
            const timer = setTimeout(refreshPreview, 120)
            return () => clearTimeout(timer)
          }, [open, sessionId, effective?.mode, effective?.text, effective?.hasTemplate])

          if (!open || !sessionId) return null

          async function update(patch) {
            setBusy(true)
            setError(null)
            try {
              await store.saveSession(sessionId, patch)
            } catch (value) {
              setError(value?.message ?? t('networkFailed'))
            } finally {
              setBusy(false)
            }
          }

          function manage() {
            store.closeModal()
            try {
              ctx.layout.selectPanel('prompt-studio')
            } catch {
              // The panel may not be registered in this composition.
            }
          }

          const active = Boolean(effective?.active)
          const templateLabel = effective?.templateName
            ? `${effective.templateName} · ${effective.mode === 'replace' ? t('modeReplace') : t('modeAppend')}`
            : t('sessionNoTemplate')

          const content = !data
            ? h('div', { className: 'psx-empty' }, entry?.error ?? t('sessionLoading'))
            : h(
                React.Fragment,
                null,
                h(
                  'div',
                  { className: 'psx-row' },
                  h(
                    'span',
                    { className: `psx-chip${active ? ' is-on' : ''}` },
                    active ? t('sessionEnabled') : t('sessionDisabled'),
                  ),
                  h('span', { className: 'psx-spacer' }),
                  h(Switch, {
                    checked: Boolean(effective?.enabled),
                    label: t('sessionEnabled'),
                    disabled: busy,
                    onChange: (value) => void update({ enabled: value }),
                  }),
                ),
                h(
                  'label',
                  { className: 'psx-field' },
                  h('span', { className: 'psx-label' }, t('sessionTemplate')),
                  h(
                    'select',
                    {
                      className: 'psx-select',
                      value: override?.templateId ?? '',
                      disabled: busy,
                      onChange: (event) => void update({ templateId: event.target.value || null }),
                    },
                    h(
                      'option',
                      { value: '' },
                      `${t('sessionInheritOption')}${
                        store.bootstrap?.global.templateId
                          ? ` · ${
                              store.bootstrap.templates.find(
                                (item) => item.id === store.bootstrap.global.templateId,
                              )?.name ?? ''
                            }`
                          : ''
                      }`,
                    ),
                    (store.bootstrap?.templates ?? []).map((template) =>
                      h(
                        'option',
                        { key: template.id, value: template.id },
                        `${template.name} · ${template.mode === 'replace' ? t('modeReplace') : t('modeAppend')}`,
                      ),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'psx-row' },
                  h('span', { className: 'psx-modal-note' }, templateLabel),
                  h('span', { className: 'psx-spacer' }),
                  override
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'psx-btn psx-btn-ghost',
                          disabled: busy,
                          onClick: () => void update({}),
                        },
                        t('sessionFollowGlobal'),
                      )
                    : null,
                ),
                error ? h('div', { className: 'psx-error' }, error) : null,
                !effective?.hasTemplate
                  ? h('div', { className: 'psx-empty' }, t('sessionNoTemplate'))
                  : h(
                      React.Fragment,
                      null,
                      h(
                        'div',
                        { className: 'psx-modal-section-head' },
                        h('span', { className: 'psx-label' }, t('previewTitle')),
                        h(
                          'button',
                          {
                            type: 'button',
                            className: 'psx-btn psx-btn-ghost',
                            disabled: preview.loading,
                            onClick: refreshPreview,
                          },
                          preview.loading ? t('previewLoading') : t('refresh'),
                        ),
                      ),
                      preview.error
                        ? h('div', { className: 'psx-error' }, `${t('previewFailed')}: ${preview.error}`)
                        : h(
                            React.Fragment,
                            null,
                            h(
                              'div',
                              { className: 'psx-preview-meta' },
                              h('span', { className: 'psx-meta-dot' }),
                              preview.data?.hasBase
                                ? `${t('previewBase')} ${
                                    preview.data.sessionTitle || shortId(preview.data.sessionId)
                                  }`
                                : t('previewNoBase'),
                            ),
                            h(
                              'pre',
                              { className: 'psx-pre psx-pre-modal' },
                              preview.loading
                                ? t('previewLoading')
                                : preview.data?.result?.trim()
                                  ? preview.data.result
                                  : t('previewEmpty'),
                            ),
                          ),
                    ),
                h('p', { className: 'psx-footnote' }, t('applyHint')),
              )

          return h(
            'div',
            {
              className: 'psx-root psx-overlay',
              onMouseDown: (event) => {
                if (event.target === event.currentTarget) store.closeModal()
              },
            },
            h(Styles),
            h(
              'div',
              {
                className: 'psx-modal',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-label': t('sessionTitle'),
              },
              h(
                'div',
                { className: 'psx-modal-head' },
                h('span', { className: 'psx-mini-icon' }, h(BrandGlyph, { size: 20 })),
                h(
                  'div',
                  { className: 'psx-grow' },
                  h('h2', { className: 'psx-modal-title' }, t('sessionTitle')),
                  h('p', { className: 'psx-hint' }, t('sessionModalHint')),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'psx-icon-btn',
                    title: t('close'),
                    'aria-label': t('close'),
                    autoFocus: true,
                    onClick: () => store.closeModal(),
                  },
                  '✕',
                ),
              ),
              h('div', { className: 'psx-modal-body' }, content),
              h(
                'div',
                { className: 'psx-modal-foot' },
                h('button', { type: 'button', className: 'psx-btn psx-btn-ghost', onClick: manage }, t('sessionManage')),
                h('span', { className: 'psx-spacer' }),
                h('button', { type: 'button', className: 'psx-btn', onClick: () => store.closeModal() }, t('close')),
              ),
            ),
          )
        }

        function IconSlot(props) {
          return h(PanelIcon, { size: props?.size ?? 18, active: Boolean(props?.active) })
        }

        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: 'prompt-studio',
              order: 20,
              label: () => t('panelTitle'),
            },
            IconSlot,
          ),
        )

        ctx.slots.inject('main', () =>
          ctx.slots.register(
            {
              name: 'main',
              key: 'prompt-studio',
            },
            () => h(Boundary, null, h(Panel)),
          ),
        )

        ctx.slots.inject('conversation.input.left', () =>
          ctx.slots.register(
            {
              name: 'conversation.input.left',
              id: 'prompt-studio',
              order: 30,
              label: () => t('sessionTitle'),
            },
            (props) => h(Boundary, null, h(SessionTrigger, props)),
          ),
        )

        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            {
              name: 'shell.overlay',
              id: 'prompt-studio-modal',
              order: 200,
              label: () => t('sessionTitle'),
            },
            () => h(Boundary, null, h(SessionModal)),
          ),
        )
      },
    }
  },
})
