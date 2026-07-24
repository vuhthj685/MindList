(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-17f86c25"],
  {
    "095d": function (t, e) {},
    1710: function (t, e, s) {},
    "2d44": function (t, e, s) {
      "use strict";
      s("1710");
    },
    "4ffd": function (t, e, s) {
      t.exports = s.p + "img/logo.png";
    },
    "74e2": function (t, e, s) {
      "use strict";
      s("eb6c");
    },
    aac7: function (t, e) {},
    db00: function (t, e, s) {
      "use strict";
      s.r(e);
      var i = function () {
          var t = this,
            e = t._self._c;
          return e("div", { staticClass: "homeContainer" }, [
            t.bgImage
              ? e("div", {
                  staticClass: "bgFullScreen",
                  style: {
                    backgroundImage: `url(${t.bgImage})`,
                    backgroundPositionX: t.bgPosX + "%",
                    backgroundPositionY: t.bgPosY + "%",
                    opacity: t.bgOpacity / 100,
                  },
                })
              : t._e(),
            e(
              "div",
              {
                staticClass: "homeHeader",
                style: {
                  background: t.currentTheme.headerBg,
                  borderBottomColor: t.hexToRgba(t.currentTheme.accent, 0.18),
                  boxShadow:
                    "0 2px 10px " + t.hexToRgba(t.currentTheme.accent, 0.08),
                },
              },
              [
                e("div", { staticClass: "headerLeft" }, [
                  e("img", {
                    staticClass: "logoImg",
                    attrs: {
                      src: s("4ffd"),
                      alt: "",
                      onerror: "this.style.display='none'",
                    },
                  }),
                  e(
                    "span",
                    {
                      staticClass: "headerTitle",
                      style: { color: t.currentTheme.text },
                    },
                    [t._v("MindList思维导图清单")],
                  ),
                ]),
                e("div", { staticClass: "headerRight" }, [
                  e("div", { staticClass: "progressPill" }, [
                    e("span", { staticClass: "progressLabel" }, [
                      t._v("总完成度"),
                    ]),
                    e(
                      "span",
                      {
                        staticClass: "progressValue",
                        style: { color: t.totalProgressColor },
                      },
                      [t._v(" " + t._s(t.totalProgressPercent) + "% ")],
                    ),
                  ]),
                  e(
                    "button",
                    {
                      staticClass: "headerBtn",
                      on: {
                        click: function (e) {
                          t.showThemePanel = !t.showThemePanel;
                        },
                      },
                    },
                    [e("span", [t._v("🎨")]), e("span", [t._v("主题")])],
                  ),
                  e(
                    "button",
                    {
                      staticClass: "headerBtn",
                      on: {
                        click: function (e) {
                          t.showBgPanel = !t.showBgPanel;
                        },
                      },
                    },
                    [e("span", [t._v("🖼️")]), e("span", [t._v("背景")])],
                  ),
                  t.isElectron
                    ? e("div", { staticClass: "windowControls" }, [
                        e(
                          "button",
                          {
                            staticClass: "windowBtn",
                            attrs: { title: "最小化" },
                            on: { click: t.windowMinimize },
                          },
                          [t._v("—")],
                        ),
                        e(
                          "button",
                          {
                            staticClass: "windowBtn",
                            attrs: { title: "全屏/还原" },
                            on: { click: t.windowToggleMaximize },
                          },
                          [t._v("▢")],
                        ),
                        e(
                          "button",
                          {
                            staticClass: "windowBtn closeBtn",
                            attrs: { title: "关闭" },
                            on: { click: t.windowClose },
                          },
                          [t._v("✕")],
                        ),
                      ])
                    : t._e(),
                ]),
              ],
            ),
            e(
              "div",
              {
                staticClass: "cardGrid",
                style: {
                  "--grid-scrollbar-thumb": t.hexToRgba(
                    t.currentTheme.accent,
                    0.24,
                  ),
                  "--grid-scrollbar-thumb-hover": t.hexToRgba(
                    t.currentTheme.accent,
                    0.36,
                  ),
                  "--grid-scrollbar-track": t.hexToRgba(
                    t.currentTheme.accent,
                    0.08,
                  ),
                },
              },
              [
                t._l(t.fileList, function (s) {
                  return e("ChecklistCard", {
                    key: s.id,
                    attrs: {
                      file: s,
                      data: t.getCardData(s.id),
                      themeCardBg: t.currentTheme.cardBg,
                      cardOpacity: t.cardOpacity,
                      themeTextColor: t.currentTheme.text,
                      themeAccent: t.currentTheme.accent,
                    },
                    on: {
                      change: t.onCardChange,
                      delete: t.deleteChecklist,
                      rename: t.renameChecklist,
                    },
                  });
                }),
                e(
                  "div",
                  { staticClass: "newCard", on: { click: t.createChecklist } },
                  [t._m(0)],
                ),
              ],
              2,
            ),
            t.showThemePanel
              ? e(
                  "div",
                  {
                    staticClass: "floatPanel themeFloatPanel",
                    on: {
                      click: function (t) {
                        t.stopPropagation();
                      },
                    },
                  },
                  [
                    e("div", { staticClass: "panelHead" }, [
                      e("span", [t._v("🎨 选择主题")]),
                      e(
                        "span",
                        {
                          staticClass: "closeX",
                          on: {
                            click: function (e) {
                              t.showThemePanel = !1;
                            },
                          },
                        },
                        [t._v("✕")],
                      ),
                    ]),
                    e(
                      "div",
                      { staticClass: "themeGrid" },
                      t._l(t.presetThemes, function (s) {
                        return e(
                          "div",
                          {
                            key: s.id,
                            staticClass: "themeCell",
                            class: { themeActive: t.currentThemeId === s.id },
                            style: { background: s.bg },
                            on: {
                              click: function (e) {
                                return t.applyTheme(s);
                              },
                            },
                          },
                          [
                            e(
                              "div",
                              {
                                staticClass: "themeMiniCard",
                                style: { background: s.cardBg },
                              },
                              [
                                e("div", {
                                  staticClass: "miniLine",
                                  style: { background: s.accent, width: "70%" },
                                }),
                                e("div", {
                                  staticClass: "miniLine",
                                  style: {
                                    background: s.accent + "60",
                                    width: "45%",
                                  },
                                }),
                              ],
                            ),
                            e(
                              "div",
                              {
                                staticClass: "themeCellName",
                                style: { color: s.text },
                              },
                              [t._v(t._s(s.name))],
                            ),
                            t.currentThemeId === s.id
                              ? e("span", { staticClass: "themeActiveDot" }, [
                                  t._v("✓"),
                                ])
                              : t._e(),
                          ],
                        );
                      }),
                      0,
                    ),
                    e("div", { staticClass: "dividerLine" }),
                    e(
                      "div",
                      { staticClass: "customColorRow" },
                      [
                        e("span", { staticClass: "customColorLabel" }, [
                          t._v("自定义主色"),
                        ]),
                        e("el-color-picker", {
                          attrs: { size: "small" },
                          on: { change: t.onCustomColorChange },
                          model: {
                            value: t.customAccentColor,
                            callback: function (e) {
                              t.customAccentColor = e;
                            },
                            expression: "customAccentColor",
                          },
                        }),
                        e("span", { staticClass: "customColorTip" }, [
                          t._v("选后自动应用"),
                        ]),
                      ],
                      1,
                    ),
                    e("div", { staticClass: "dividerLine" }),
                    e(
                      "div",
                      { staticClass: "opacitySection" },
                      [
                        e("div", { staticClass: "opacityLabel" }, [
                          t._v("卡片透明度 " + t._s(t.cardOpacity) + "%"),
                        ]),
                        e("el-slider", {
                          staticStyle: { margin: "4px 0 0" },
                          attrs: { min: 10, max: 100, step: 5 },
                          on: { input: t.saveCardOpacity },
                          model: {
                            value: t.cardOpacity,
                            callback: function (e) {
                              t.cardOpacity = e;
                            },
                            expression: "cardOpacity",
                          },
                        }),
                      ],
                      1,
                    ),
                  ],
                )
              : t._e(),
            t.showBgPanel
              ? e(
                  "div",
                  {
                    staticClass: "floatPanel bgFloatPanel",
                    on: {
                      click: function (t) {
                        t.stopPropagation();
                      },
                    },
                  },
                  [
                    e("div", { staticClass: "panelHead" }, [
                      e("span", [t._v("🖼️ 自定义背景")]),
                      e(
                        "span",
                        {
                          staticClass: "closeX",
                          on: {
                            click: function (e) {
                              t.showBgPanel = !1;
                            },
                          },
                        },
                        [t._v("✕")],
                      ),
                    ]),
                    e("input", {
                      ref: "bgInput",
                      staticStyle: { display: "none" },
                      attrs: { type: "file", accept: "image/*" },
                      on: { change: t.onBgFile },
                    }),
                    e(
                      "div",
                      {
                        staticClass: "bgUploadBtn",
                        on: {
                          click: function (e) {
                            return t.$refs.bgInput.click();
                          },
                        },
                      },
                      [
                        t.bgImage
                          ? e("span", [t._v("🔄 更换图片")])
                          : e("span", [t._v("📁 选择图片")]),
                      ],
                    ),
                    t.bgImage
                      ? [
                          e("div", { staticClass: "cropSection" }, [
                            e("div", { staticClass: "cropLabel" }, [
                              t._v("框选显示区域（拖动红框选择背景区域）"),
                            ]),
                            e(
                              "div",
                              {
                                ref: "cropCanvas",
                                staticClass: "cropCanvas",
                                on: {
                                  mousedown: t.onCropStart,
                                  mousemove: t.onCropMove,
                                  mouseup: t.onCropEnd,
                                },
                              },
                              [
                                e("img", {
                                  ref: "cropImg",
                                  staticClass: "cropBaseImg",
                                  attrs: { src: t.bgImage },
                                  on: { load: t.initCropView },
                                }),
                                e("div", { staticClass: "cropMask" }),
                                e("div", {
                                  staticClass: "cropBox",
                                  style: {
                                    left: t.cropRect.x + "px",
                                    top: t.cropRect.y + "px",
                                    width: t.cropRect.w + "px",
                                    height: t.cropRect.h + "px",
                                  },
                                }),
                              ],
                            ),
                            e(
                              "div",
                              { staticClass: "cropActions" },
                              [
                                e(
                                  "el-button",
                                  {
                                    attrs: { size: "mini" },
                                    on: { click: t.setCropToScreen },
                                  },
                                  [t._v("📐 适配屏幕比例")],
                                ),
                                e(
                                  "el-button",
                                  {
                                    attrs: { size: "mini" },
                                    on: { click: t.setCropFull },
                                  },
                                  [t._v("🔲 全图")],
                                ),
                              ],
                              1,
                            ),
                          ]),
                          e(
                            "div",
                            { staticClass: "sliderRow" },
                            [
                              e("span", { staticClass: "sliderLabel" }, [
                                t._v("透明度 " + t._s(t.bgOpacity) + "%"),
                              ]),
                              e("el-slider", {
                                staticStyle: { flex: "1", margin: "0 10px" },
                                attrs: { min: 0, max: 100, step: 5 },
                                on: { input: t.saveBg },
                                model: {
                                  value: t.bgOpacity,
                                  callback: function (e) {
                                    t.bgOpacity = e;
                                  },
                                  expression: "bgOpacity",
                                },
                              }),
                            ],
                            1,
                          ),
                          e(
                            "div",
                            {
                              staticClass: "removeBgBtn",
                              on: { click: t.removeBg },
                            },
                            [t._v("✕ 移除背景图片")],
                          ),
                        ]
                      : t._e(),
                  ],
                  2,
                )
              : t._e(),
            t.showThemePanel || t.showBgPanel
              ? e("div", {
                  staticClass: "panelBackdrop",
                  on: {
                    click: function (e) {
                      ((t.showThemePanel = !1), (t.showBgPanel = !1));
                    },
                  },
                })
              : t._e(),
          ]);
        },
        a = [
          function () {
            var t = this,
              e = t._self._c;
            return e("div", { staticClass: "newCardInner" }, [
              e("div", { staticClass: "newCardPlus" }, [t._v("+")]),
              e("div", { staticClass: "newCardText" }, [t._v("新建清单")]),
            ]);
          },
        ],
        n =
          (s("14d9"),
          function () {
            var t = this,
              e = t._self._c;
            return e(
              "div",
              {
                staticClass: "checklistCard",
                style: {
                  background: t.cardBackground,
                  color: t.themeTextColor,
                },
              },
              [
                e(
                  "div",
                  {
                    staticClass: "cardHeader",
                    style: { borderColor: "rgba(0,0,0,0.06)" },
                  },
                  [
                    t.isEditingTitle
                      ? e("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.titleText,
                              expression: "titleText",
                            },
                          ],
                          ref: "titleInput",
                          staticClass: "titleInput",
                          domProps: { value: t.titleText },
                          on: {
                            blur: t.finishTitleEdit,
                            keyup: [
                              function (e) {
                                return !e.type.indexOf("key") &&
                                  t._k(e.keyCode, "enter", 13, e.key, "Enter")
                                  ? null
                                  : t.finishTitleEdit.apply(null, arguments);
                              },
                              function (e) {
                                return !e.type.indexOf("key") &&
                                  t._k(e.keyCode, "esc", 27, e.key, [
                                    "Esc",
                                    "Escape",
                                  ])
                                  ? null
                                  : t.cancelTitleEdit.apply(null, arguments);
                              },
                            ],
                            click: function (t) {
                              t.stopPropagation();
                            },
                            input: function (e) {
                              e.target.composing ||
                                (t.titleText = e.target.value);
                            },
                          },
                        })
                      : e(
                          "div",
                          {
                            staticClass: "cardTitle",
                            style: { color: t.themeTextColor },
                            on: {
                              dblclick: function (e) {
                                return (
                                  e.stopPropagation(),
                                  t.startTitleEdit.apply(null, arguments)
                                );
                              },
                            },
                          },
                          [t._v(" " + t._s(t.file.name) + " ")],
                        ),
                    e("div", { staticClass: "cardActions" }, [
                      e(
                        "span",
                        {
                          staticClass: "actionBtn editBtn",
                          attrs: { title: "在思维导图中编辑" },
                          on: {
                            click: function (e) {
                              return (
                                e.stopPropagation(),
                                t.openEditor.apply(null, arguments)
                              );
                            },
                          },
                        },
                        [
                          e(
                            "svg",
                            {
                              attrs: {
                                width: "18",
                                height: "18",
                                viewBox: "0 0 20 20",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                              },
                            },
                            [
                              e("circle", {
                                attrs: {
                                  cx: "5",
                                  cy: "10",
                                  r: "3",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                },
                              }),
                              e("circle", {
                                attrs: {
                                  cx: "16",
                                  cy: "4",
                                  r: "2",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                },
                              }),
                              e("circle", {
                                attrs: {
                                  cx: "16",
                                  cy: "10",
                                  r: "2",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                },
                              }),
                              e("circle", {
                                attrs: {
                                  cx: "16",
                                  cy: "16",
                                  r: "2",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                },
                              }),
                              e("line", {
                                attrs: {
                                  x1: "8",
                                  y1: "9",
                                  x2: "14",
                                  y2: "5",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                },
                              }),
                              e("line", {
                                attrs: {
                                  x1: "8",
                                  y1: "10",
                                  x2: "14",
                                  y2: "10",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                },
                              }),
                              e("line", {
                                attrs: {
                                  x1: "8",
                                  y1: "11",
                                  x2: "14",
                                  y2: "15",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                },
                              }),
                            ],
                          ),
                        ],
                      ),
                      e(
                        "span",
                        {
                          staticClass: "actionBtn deleteBtn",
                          attrs: { title: "删除" },
                          on: {
                            click: function (e) {
                              return (
                                e.stopPropagation(),
                                t.confirmDelete.apply(null, arguments)
                              );
                            },
                          },
                        },
                        [e("i", { staticClass: "el-icon-delete" })],
                      ),
                    ]),
                  ],
                ),
                e("div", { staticClass: "progressBar" }, [
                  e("div", { staticClass: "progressInfo" }, [
                    e(
                      "span",
                      {
                        staticClass: "progressLabel",
                        style: { color: t.subTextColor },
                      },
                      [t._v("完成进度")],
                    ),
                    e(
                      "span",
                      {
                        staticClass: "progressPercent",
                        style: { color: t.progressColor },
                      },
                      [t._v(t._s(t.progressPercent) + "%")],
                    ),
                  ]),
                  e(
                    "div",
                    {
                      staticClass: "progressTrack",
                      style: { background: t.trackBg },
                    },
                    [
                      e("div", {
                        staticClass: "progressFill",
                        style: {
                          width: t.progressPercent + "%",
                          background: t.progressColor,
                        },
                      }),
                    ],
                  ),
                ]),
                e("div", { staticClass: "nodeList" }, [
                  e(
                    "div",
                    { staticClass: "nodeListScroll" },
                    [
                      t._l(t.rootChildren, function (s, i) {
                        return e("NodeItem", {
                          key: s._id || i,
                          attrs: {
                            node: s,
                            level: 0,
                            maxLevel: 19,
                            themeTextColor: t.themeTextColor,
                          },
                          on: {
                            change: t.onNodeChange,
                            addChild: t.onAddChild,
                          },
                        });
                      }),
                      e("div", { staticClass: "addRootNodeRow" }, [
                        t.isAddingRoot
                          ? e("div", { staticClass: "addNodeInputRow" }, [
                              e("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: t.newRootText,
                                    expression: "newRootText",
                                  },
                                ],
                                ref: "rootInput",
                                staticClass: "addNodeInput",
                                attrs: {
                                  placeholder: "输入节点名称，回车确认",
                                },
                                domProps: { value: t.newRootText },
                                on: {
                                  keyup: [
                                    function (e) {
                                      return !e.type.indexOf("key") &&
                                        t._k(
                                          e.keyCode,
                                          "enter",
                                          13,
                                          e.key,
                                          "Enter",
                                        )
                                        ? null
                                        : t.confirmAddRoot.apply(
                                            null,
                                            arguments,
                                          );
                                    },
                                    function (e) {
                                      return !e.type.indexOf("key") &&
                                        t._k(e.keyCode, "esc", 27, e.key, [
                                          "Esc",
                                          "Escape",
                                        ])
                                        ? null
                                        : t.cancelAddRoot.apply(
                                            null,
                                            arguments,
                                          );
                                    },
                                  ],
                                  blur: t.confirmAddRoot,
                                  click: function (t) {
                                    t.stopPropagation();
                                  },
                                  input: function (e) {
                                    e.target.composing ||
                                      (t.newRootText = e.target.value);
                                  },
                                },
                              }),
                            ])
                          : e(
                              "div",
                              {
                                staticClass: "addRootBtn",
                                style: { color: t.subTextColor },
                                on: {
                                  click: function (e) {
                                    return (
                                      e.stopPropagation(),
                                      t.startAddRoot.apply(null, arguments)
                                    );
                                  },
                                },
                              },
                              [
                                e("span", { staticClass: "addIcon" }, [
                                  t._v("+"),
                                ]),
                                e("span", { staticClass: "addText" }, [
                                  t._v("新建二级节点"),
                                ]),
                              ],
                            ),
                      ]),
                    ],
                    2,
                  ),
                ]),
              ],
            );
          }),
        o = [],
        r = function () {
          var t = this,
            e = t._self._c;
          return e("div", { staticClass: "nodeItemWrap" }, [
            e(
              "div",
              {
                staticClass: "nodeRow",
                class: { rowChecked: t.node.data.checked },
                style: { paddingLeft: 18 * t.level + "px" },
              },
              [
                e(
                  "span",
                  {
                    staticClass: "collapseBtn",
                    on: {
                      click: function (e) {
                        return (
                          e.stopPropagation(),
                          t.toggleCollapse.apply(null, arguments)
                        );
                      },
                    },
                  },
                  [
                    t.hasChildren
                      ? [
                          e(
                            "span",
                            {
                              staticClass: "triangle",
                              class: { collapsed: t.isCollapsed },
                            },
                            [t._v("▼")],
                          ),
                        ]
                      : [e("span", { staticClass: "dot" }, [t._v("·")])],
                  ],
                  2,
                ),
                e(
                  "span",
                  {
                    staticClass: "nodeTextArea",
                    on: {
                      dblclick: function (e) {
                        return (
                          e.stopPropagation(),
                          t.startEdit.apply(null, arguments)
                        );
                      },
                    },
                  },
                  [
                    t.isEditing
                      ? e("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.editText,
                              expression: "editText",
                            },
                          ],
                          ref: "editInput",
                          staticClass: "nodeEditInput",
                          domProps: { value: t.editText },
                          on: {
                            blur: t.finishEdit,
                            keyup: [
                              function (e) {
                                return !e.type.indexOf("key") &&
                                  t._k(e.keyCode, "enter", 13, e.key, "Enter")
                                  ? null
                                  : t.finishEdit.apply(null, arguments);
                              },
                              function (e) {
                                return !e.type.indexOf("key") &&
                                  t._k(e.keyCode, "esc", 27, e.key, [
                                    "Esc",
                                    "Escape",
                                  ])
                                  ? null
                                  : t.cancelEdit.apply(null, arguments);
                              },
                            ],
                            click: function (t) {
                              t.stopPropagation();
                            },
                            input: function (e) {
                              e.target.composing ||
                                (t.editText = e.target.value);
                            },
                          },
                        })
                      : e(
                          "span",
                          {
                            staticClass: "nodeText",
                            class: { doneText: t.node.data.checked },
                            style: {
                              color: t.node.data.checked
                                ? void 0
                                : t.themeTextColor,
                            },
                          },
                          [
                            t._v(" " + t._s(t.displayText) + " "),
                            t.contentTags
                              ? e("span", { staticClass: "contentTags" }, [
                                  t._v(t._s(t.contentTags)),
                                ])
                              : t._e(),
                          ],
                        ),
                  ],
                ),
                t.level < t.maxLevel
                  ? e(
                      "span",
                      {
                        staticClass: "addBtn",
                        attrs: { title: "新建子节点" },
                        on: {
                          click: function (e) {
                            return (
                              e.stopPropagation(),
                              t.startAddChild.apply(null, arguments)
                            );
                          },
                        },
                      },
                      [t._v("+")],
                    )
                  : t._e(),
                e(
                  "span",
                  {
                    staticClass: "cbWrap",
                    on: {
                      click: function (e) {
                        return (
                          e.stopPropagation(),
                          t.toggleCheck.apply(null, arguments)
                        );
                      },
                    },
                  },
                  [
                    e(
                      "span",
                      {
                        staticClass: "cb",
                        class: { cbChecked: t.node.data.checked },
                      },
                      [
                        t.node.data.checked
                          ? e(
                              "svg",
                              {
                                attrs: {
                                  width: "10",
                                  height: "10",
                                  viewBox: "0 0 10 10",
                                },
                              },
                              [
                                e("path", {
                                  attrs: {
                                    d: "M 1.5,5.5 L 4,8 L 8.5,2",
                                    stroke: "white",
                                    "stroke-width": "1.8",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    fill: "none",
                                  },
                                }),
                              ],
                            )
                          : t._e(),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            !t.isCollapsed && t.hasChildren && t.level < t.maxLevel
              ? e(
                  "div",
                  { staticClass: "childrenArea" },
                  t._l(t.node.children, function (s, i) {
                    return e("NodeItem", {
                      key: s._id || i,
                      attrs: {
                        node: s,
                        level: t.level + 1,
                        maxLevel: t.maxLevel,
                        themeTextColor: t.themeTextColor,
                      },
                      on: {
                        change: function (e) {
                          return t.$emit("change");
                        },
                        addChild: function (e) {
                          return t.$emit("addChild", e);
                        },
                      },
                    });
                  }),
                  1,
                )
              : t._e(),
            t.isAddingChild
              ? e(
                  "div",
                  {
                    staticClass: "addChildRow",
                    style: { paddingLeft: 18 * (t.level + 1) + 8 + "px" },
                  },
                  [
                    e("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: t.addChildText,
                          expression: "addChildText",
                        },
                      ],
                      ref: "addChildInput",
                      staticClass: "addChildInput",
                      attrs: { placeholder: "输入名称，回车确认" },
                      domProps: { value: t.addChildText },
                      on: {
                        keyup: [
                          function (e) {
                            return !e.type.indexOf("key") &&
                              t._k(e.keyCode, "enter", 13, e.key, "Enter")
                              ? null
                              : t.confirmAddChild.apply(null, arguments);
                          },
                          function (e) {
                            return !e.type.indexOf("key") &&
                              t._k(e.keyCode, "esc", 27, e.key, [
                                "Esc",
                                "Escape",
                              ])
                              ? null
                              : t.cancelAddChild.apply(null, arguments);
                          },
                        ],
                        blur: t.confirmAddChild,
                        click: function (t) {
                          t.stopPropagation();
                        },
                        input: function (e) {
                          e.target.composing ||
                            (t.addChildText = e.target.value);
                        },
                      },
                    }),
                  ],
                )
              : t._e(),
          ]);
        },
        c = [];
      function l(t) {
        if (!t) return "";
        let e = t;
        if (/<[^>]+>/.test(t)) {
          const s = document.createElement("div");
          ((s.innerHTML = t), (e = s.textContent || s.innerText || ""));
        }
        return (
          (e = e.replace(/^\s*(\[[\s\-xX✓✕]*\]|\[x\]|\[ \]|✓|✕|☑|☐)\s*/u, "")),
          e.trim()
        );
      }
      let d = Date.now();
      function h() {
        return "ni_" + (++d).toString(36);
      }
      var p = {
          name: "NodeItem",
          props: {
            node: { type: Object, required: !0 },
            level: { type: Number, default: 0 },
            maxLevel: { type: Number, default: 19 },
            themeTextColor: { type: String, default: "#333333" },
          },
          data() {
            return {
              isCollapsed: !1,
              isEditing: !1,
              editText: "",
              isAddingChild: !1,
              addChildText: "",
            };
          },
          computed: {
            hasChildren() {
              return !!(this.node.children && this.node.children.length > 0);
            },
            displayText() {
              return l(this.node.data.text);
            },
            contentTags() {
              const t = this.node.data,
                e = [];
              return (
                t.image && e.push("【图片】"),
                t.hyperlink && e.push("【链接】"),
                t.icon && t.icon.length > 0 && e.push("【图标】"),
                t.note && e.push("【备注】"),
                t.generalization && e.push("【概要】"),
                t.formula && e.push("【公式】"),
                e.join(" ")
              );
            },
          },
          methods: {
            toggleCollapse() {
              this.hasChildren && (this.isCollapsed = !this.isCollapsed);
            },
            toggleCheck() {
              const t = !this.node.data.checked;
              (this.$set(this.node.data, "checked", t),
                this.cascadeDown(this.node, t),
                this.$emit("change"));
            },
            cascadeDown(t, e) {
              t.children &&
                t.children.forEach((t) => {
                  (this.$set(t.data, "checked", e), this.cascadeDown(t, e));
                });
            },
            startEdit() {
              ((this.editText = this.displayText),
                (this.isEditing = !0),
                this.$nextTick(() => {
                  this.$refs.editInput && this.$refs.editInput.focus();
                }));
            },
            finishEdit() {
              const t = this.editText.trim();
              (t &&
                (this.$set(this.node.data, "text", t), this.$emit("change")),
                (this.isEditing = !1));
            },
            cancelEdit() {
              this.isEditing = !1;
            },
            startAddChild() {
              ((this.addChildText = ""),
                (this.isAddingChild = !0),
                this.$nextTick(() => {
                  this.$refs.addChildInput && this.$refs.addChildInput.focus();
                }));
            },
            confirmAddChild() {
              const t = this.addChildText.trim();
              (t &&
                (this.node.children || this.$set(this.node, "children", []),
                this.node.children.push({
                  _id: h(),
                  data: { text: t, checked: !1 },
                  children: [],
                }),
                (this.isCollapsed = !1),
                this.$emit("change")),
                (this.isAddingChild = !1),
                (this.addChildText = ""));
            },
            cancelAddChild() {
              ((this.isAddingChild = !1), (this.addChildText = ""));
            },
          },
        },
        u = p,
        g = (s("74e2"), s("2877")),
        f = Object(g["a"])(u, r, c, !1, null, "ca7abc44", null),
        C = f.exports,
        m = s("d763");
      let y = Date.now();
      function b() {
        return "n_" + (++y).toString(36);
      }
      function v(t) {
        (t._id || (t._id = b()), t.children && t.children.forEach((t) => v(t)));
      }
      function x(t, e) {
        if (!t || !t.startsWith("#")) return `rgba(255,255,255,${e / 100})`;
        const s = t.replace("#", ""),
          i = parseInt(s.substring(0, 2), 16),
          a = parseInt(s.substring(2, 4), 16),
          n = parseInt(s.substring(4, 6), 16);
        return `rgba(${i},${a},${n},${e / 100})`;
      }
      function k(t) {
        if (!t || !t.startsWith("#")) return !1;
        const e = t.replace("#", ""),
          s = parseInt(e.substring(0, 2), 16),
          i = parseInt(e.substring(2, 4), 16),
          a = parseInt(e.substring(4, 6), 16),
          n = (0.299 * s + 0.587 * i + 0.114 * a) / 255;
        return n < 0.5;
      }
      var w = {
          name: "ChecklistCard",
          components: { NodeItem: C },
          props: {
            file: { type: Object, required: !0 },
            data: { type: Object, default: null },
            themeCardBg: { type: String, default: "#ffffff" },
            cardOpacity: { type: Number, default: 100 },
            themeTextColor: { type: String, default: "#1a1a1a" },
            themeAccent: { type: String, default: "#409eff" },
          },
          data() {
            return {
              isEditingTitle: !1,
              titleText: "",
              isAddingRoot: !1,
              newRootText: "",
            };
          },
          computed: {
            cardBackground() {
              return x(this.themeCardBg, this.cardOpacity);
            },
            subTextColor() {
              return k(this.themeCardBg)
                ? "rgba(255,255,255,0.5)"
                : "rgba(0,0,0,0.4)";
            },
            trackBg() {
              if (this.themeAccent && this.themeAccent.startsWith("#")) {
                const t = this.themeAccent.replace("#", ""),
                  e = parseInt(t.substring(0, 2), 16),
                  s = parseInt(t.substring(2, 4), 16),
                  i = parseInt(t.substring(4, 6), 16);
                return k(this.themeCardBg)
                  ? `rgba(${e},${s},${i},0.25)`
                  : `rgba(${e},${s},${i},0.12)`;
              }
              return k(this.themeCardBg)
                ? "rgba(255,255,255,0.15)"
                : "rgba(0,0,0,0.06)";
            },
            rootChildren() {
              const t =
                this.data && this.data.root && this.data.root.children
                  ? this.data.root.children
                  : [];
              return (t.forEach((t) => v(t)), t);
            },
            progressStats() {
              return this.data && this.data.root
                ? Object(m["a"])(this.data.root)
                : { total: 0, checked: 0 };
            },
            progressPercent() {
              const { total: t, checked: e } = this.progressStats;
              return 0 === t ? 0 : Math.round((e / t) * 100);
            },
            progressColor() {
              const t = this.progressPercent;
              return 100 === t ? "#67c23a" : t >= 60 ? "#e6a23c" : "#409eff";
            },
          },
          methods: {
            openEditor() {
              this.$router.push({ path: "/edit", query: { id: this.file.id } });
            },
            onNodeChange() {
              this.$emit("change", this.file.id, this.data);
            },
            onAddChild(t) {
              (t.children || this.$set(t, "children", []),
                t.children.push({
                  _id: b(),
                  data: { text: "", checked: !1 },
                  children: [],
                }),
                this.onNodeChange());
            },
            startAddRoot() {
              ((this.isAddingRoot = !0),
                (this.newRootText = ""),
                this.$nextTick(() => {
                  this.$refs.rootInput && this.$refs.rootInput.focus();
                }));
            },
            confirmAddRoot() {
              const t = this.newRootText.trim();
              if (t) {
                if (!this.data || !this.data.root) return;
                (this.data.root.children ||
                  this.$set(this.data.root, "children", []),
                  this.data.root.children.push({
                    _id: b(),
                    data: { text: t, checked: !1 },
                    children: [],
                  }),
                  this.onNodeChange());
              }
              ((this.isAddingRoot = !1), (this.newRootText = ""));
            },
            cancelAddRoot() {
              ((this.isAddingRoot = !1), (this.newRootText = ""));
            },
            startTitleEdit() {
              ((this.titleText = this.file.name),
                (this.isEditingTitle = !0),
                this.$nextTick(() => {
                  this.$refs.titleInput && this.$refs.titleInput.focus();
                }));
            },
            finishTitleEdit() {
              const t = this.titleText.trim();
              (t && this.$emit("rename", this.file.id, t),
                (this.isEditingTitle = !1));
            },
            cancelTitleEdit() {
              this.isEditingTitle = !1;
            },
            confirmDelete() {
              this.$confirm("确认删除这个清单吗？删除后无法恢复。", "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  this.$emit("delete", this.file.id);
                })
                .catch(() => {});
            },
          },
        },
        T = w,
        _ = (s("2d44"), Object(g["a"])(T, n, o, !1, null, "716a33b3", null)),
        I = _.exports;
      const B = [
          {
            id: "default",
            name: "默认白",
            bg: "#f5f7fa",
            headerBg: "#ffffff",
            cardBg: "#ffffff",
            text: "#1a1a1a",
            subText: "#999",
            accent: "#409eff",
            newCardBorder: "#d0d7e0",
          },
          {
            id: "dark",
            name: "暗夜黑",
            bg: "#1a1d21",
            headerBg: "#22262b",
            cardBg: "#2c3035",
            text: "#e0e0e0",
            subText: "#888",
            accent: "#5b9cf6",
            newCardBorder: "#3a3f45",
          },
          {
            id: "green",
            name: "清新绿",
            bg: "#e8f5e9",
            headerBg: "#c8e6c9",
            cardBg: "#f1f9f1",
            text: "#1b5e20",
            subText: "#558b2f",
            accent: "#43a047",
            newCardBorder: "#a5d6a7",
          },
          {
            id: "blue",
            name: "天空蓝",
            bg: "#e3f0fc",
            headerBg: "#bbdefb",
            cardBg: "#f0f7ff",
            text: "#0d47a1",
            subText: "#1565c0",
            accent: "#2196f3",
            newCardBorder: "#90caf9",
          },
          {
            id: "orange",
            name: "温暖橙",
            bg: "#fff3e0",
            headerBg: "#ffe0b2",
            cardBg: "#fffaf4",
            text: "#bf360c",
            subText: "#e65100",
            accent: "#f57c00",
            newCardBorder: "#ffcc80",
          },
          {
            id: "lavender",
            name: "薰衣草",
            bg: "#ede7f6",
            headerBg: "#d1c4e9",
            cardBg: "#faf7ff",
            text: "#4a148c",
            subText: "#6a1b9a",
            accent: "#7c4dff",
            newCardBorder: "#ce93d8",
          },
        ],
        P = "MIND_MAP_HOME_THEME",
        $ = "MIND_MAP_HOME_BG",
        A = "MIND_MAP_HOME_BG_OP",
        E = "MIND_MAP_HOME_BG_POS";
      var O = {
          name: "HomePage",
          components: { ChecklistCard: I },
          data() {
            return {
              fileList: [],
              fileDataCache: {},
              presetThemes: [...B],
              currentThemeId: "default",
              customAccentColor: "#409eff",
              showThemePanel: !1,
              cardOpacity: 100,
              bgImage: "",
              bgOpacity: 30,
              bgPosX: 50,
              bgPosY: 50,
              showBgPanel: !1,
              cropRect: { x: 0, y: 0, w: 200, h: 120 },
              cropDragging: !1,
              cropStart: null,
            };
          },
          computed: {
            currentTheme() {
              return (
                this.presetThemes.find((t) => t.id === this.currentThemeId) ||
                B[0]
              );
            },
            totalProgressPercent() {
              let t = 0,
                e = 0;
              return (
                this.fileList.forEach((s) => {
                  const i = this.fileDataCache[s.id];
                  if (i && i.root) {
                    const s = Object(m["a"])(i.root);
                    ((t += s.total), (e += s.checked));
                  }
                }),
                0 === t ? 0 : Math.round((e / t) * 100)
              );
            },
            totalProgressColor() {
              const t = this.totalProgressPercent;
              return 100 === t
                ? "#67c23a"
                : t >= 60
                  ? "#e6a23c"
                  : this.currentTheme.accent;
            },
            isElectron() {
              return !(!window.electronAPI || !window.electronAPI.isElectron);
            },
          },
          created() {
            (this.loadFiles(),
              this.loadTheme(),
              this.loadBg(),
              this.loadCardOpacity(),
              this.$nextTick(() =>
                this.syncElectronTitleBar(this.currentTheme),
              ),
              this.$bus.$on(
                "checklist_sync_from_mindmap",
                this.onMindMapChanged,
              ));
          },
          activated() {
            this.loadFiles();
          },
          beforeDestroy() {
            this.$bus.$off(
              "checklist_sync_from_mindmap",
              this.onMindMapChanged,
            );
          },
          methods: {
            loadFiles() {
              const t = Object(m["e"])();
              ((this.fileList = t),
                t.forEach((t) => {
                  const e = Object(m["d"])(t.id);
                  e && this.$set(this.fileDataCache, t.id, e);
                }));
            },
            getCardData(t) {
              return this.fileDataCache[t] || null;
            },
            async createChecklist() {
              try {
                const { value: t } = await this.$prompt(
                  "请输入清单名称",
                  "新建清单",
                  {
                    confirmButtonText: "创建",
                    cancelButtonText: "取消",
                    inputValue: "新建清单",
                    inputValidator: (t) => !(!t || !t.trim()) || "名称不能为空",
                  },
                );
                if (t && t.trim()) {
                  const { file: e, data: s } = Object(m["b"])(t.trim());
                  (this.fileList.push(e),
                    this.$set(this.fileDataCache, e.id, s),
                    this.$message.success(
                      "清单已创建！点击卡片右上角图标进入思维导图编辑",
                    ));
                }
              } catch (t) {}
            },
            deleteChecklist(t) {
              (Object(m["c"])(t),
                (this.fileList = this.fileList.filter((e) => e.id !== t)),
                this.$delete(this.fileDataCache, t),
                this.$message.success("已删除"));
            },
            renameChecklist(t, e) {
              Object(m["f"])(t, e);
              const s = this.fileList.find((e) => e.id === t);
              s && (s.name = e);
              const i = this.fileDataCache[t];
              i &&
                i.root &&
                (this.$set(i.root, "data", { ...i.root.data, text: e }),
                Object(m["g"])(t, i),
                this.$set(this.fileDataCache, t, { ...i }));
            },
            onMindMapChanged() {
              this.loadFiles();
            },
            onCardChange(t, e) {
              (Object(m["g"])(t, e),
                this.$set(this.fileDataCache, t, { ...e }),
                this.$bus.$emit("mindmap_sync_from_checklist", t));
            },
            loadTheme() {
              try {
                const t = localStorage.getItem(P);
                if (t) {
                  const e = JSON.parse(t);
                  ("custom" === e.id && (this.presetThemes = [...B, e]),
                    (this.currentThemeId = e.id),
                    (this.customAccentColor = e.accent || "#409eff"));
                }
              } catch (t) {}
            },
            applyTheme(t) {
              ((this.currentThemeId = t.id),
                (this.customAccentColor = t.accent),
                localStorage.setItem(P, JSON.stringify(t)),
                (document.body.style.background = t.bg),
                this.syncElectronTitleBar(t));
            },
            syncElectronTitleBar(t) {
              if (window.electronAPI && window.electronAPI.setThemeColor) {
                const e =
                  "dark" === t.id ||
                  (t.headerBg && this.isColorDark(t.headerBg));
                window.electronAPI.setThemeColor(
                  t.headerBg || t.bg,
                  e ? "#ffffff" : "#1a1a1a",
                );
              }
            },
            isColorDark(t) {
              if (!t || !t.startsWith("#")) return !1;
              const e = t.replace("#", ""),
                s = parseInt(e.substring(0, 2), 16),
                i = parseInt(e.substring(2, 4), 16),
                a = parseInt(e.substring(4, 6), 16);
              return (0.299 * s + 0.587 * i + 0.114 * a) / 255 < 0.5;
            },
            hexToRgba(t, e = 1) {
              if (!t || !t.startsWith("#")) return `rgba(64,158,255,${e})`;
              const s = t.replace("#", ""),
                i = parseInt(s.substring(0, 2), 16),
                a = parseInt(s.substring(2, 4), 16),
                n = parseInt(s.substring(4, 6), 16);
              return `rgba(${i}, ${a}, ${n}, ${e})`;
            },
            windowMinimize() {
              window.electronAPI &&
                window.electronAPI.minimizeWindow &&
                window.electronAPI.minimizeWindow();
            },
            windowToggleMaximize() {
              window.electronAPI &&
                window.electronAPI.toggleMaximizeWindow &&
                window.electronAPI.toggleMaximizeWindow();
            },
            windowClose() {
              window.electronAPI &&
                window.electronAPI.closeWindow &&
                window.electronAPI.closeWindow();
            },
            onCustomColorChange(t) {
              if (!t) return;
              const e = {
                  id: "custom",
                  name: "自定义",
                  bg: t + "18",
                  headerBg: t + "28",
                  cardBg: "#ffffff",
                  text: "#1a1a1a",
                  subText: "#888888",
                  accent: t,
                  newCardBorder: t + "60",
                },
                s = this.presetThemes.findIndex((t) => "custom" === t.id);
              (s >= 0
                ? this.presetThemes.splice(s, 1, e)
                : this.presetThemes.push(e),
                this.applyTheme(e));
            },
            loadCardOpacity() {
              const t = localStorage.getItem("MIND_MAP_CARD_OPACITY");
              this.cardOpacity = null !== t ? parseInt(t) : 100;
            },
            saveCardOpacity() {
              localStorage.setItem(
                "MIND_MAP_CARD_OPACITY",
                String(this.cardOpacity),
              );
            },
            loadBg() {
              try {
                this.bgImage = localStorage.getItem($) || "";
                const t = localStorage.getItem(A);
                this.bgOpacity = null !== t ? parseInt(t) : 30;
                const e = localStorage.getItem(E);
                if (e) {
                  const t = JSON.parse(e);
                  ((this.bgPosX = t.x || 50),
                    (this.bgPosY = t.y || 50),
                    (this.cropRect = t.crop || this.cropRect));
                }
              } catch (t) {}
            },
            onBgFile(t) {
              const e = t.target.files && t.target.files[0];
              if (!e) return;
              const s = new FileReader();
              ((s.onload = (t) => {
                ((this.bgImage = t.target.result),
                  this.saveBg(),
                  this.$nextTick(() => this.initCropView()));
              }),
                s.readAsDataURL(e),
                (t.target.value = ""));
            },
            saveBg() {
              try {
                (this.bgImage && localStorage.setItem($, this.bgImage),
                  localStorage.setItem(A, String(this.bgOpacity)),
                  localStorage.setItem(
                    E,
                    JSON.stringify({
                      x: this.bgPosX,
                      y: this.bgPosY,
                      crop: this.cropRect,
                    }),
                  ));
              } catch (t) {}
            },
            removeBg() {
              ((this.bgImage = ""), localStorage.removeItem($));
            },
            initCropView() {
              const t = this.$refs.cropCanvas,
                e = this.$refs.cropImg;
              if (!t || !e) return;
              const s = t.offsetWidth,
                i = t.offsetHeight,
                a = window.innerWidth / window.innerHeight,
                n = Math.min(s, i * a),
                o = n / a;
              ((this.cropRect = { x: (s - n) / 2, y: (i - o) / 2, w: n, h: o }),
                this.applyCropToBackground());
            },
            setCropToScreen() {
              const t = this.$refs.cropCanvas;
              if (!t) return;
              const e = t.offsetWidth,
                s = t.offsetHeight,
                i = window.innerWidth / window.innerHeight,
                a = Math.min(e, s * i),
                n = a / i;
              ((this.cropRect = { x: (e - a) / 2, y: (s - n) / 2, w: a, h: n }),
                this.applyCropToBackground());
            },
            setCropFull() {
              const t = this.$refs.cropCanvas;
              t &&
                ((this.cropRect = {
                  x: 0,
                  y: 0,
                  w: t.offsetWidth,
                  h: t.offsetHeight,
                }),
                this.applyCropToBackground());
            },
            applyCropToBackground() {
              const t = this.$refs.cropCanvas;
              if (!t) return;
              const e = t.offsetWidth,
                s = t.offsetHeight,
                { x: i, y: a, w: n, h: o } = this.cropRect;
              ((this.bgPosX = Math.round(((i + n / 2) / e) * 100)),
                (this.bgPosY = Math.round(((a + o / 2) / s) * 100)),
                this.saveBg());
            },
            onCropStart(t) {
              ((this.cropDragging = !0),
                (this.cropStart = {
                  mx: t.offsetX,
                  my: t.offsetY,
                  rect: { ...this.cropRect },
                }));
            },
            onCropMove(t) {
              if (!this.cropDragging || !this.cropStart) return;
              const e = this.$refs.cropCanvas;
              if (!e) return;
              const s = t.offsetX - this.cropStart.mx,
                i = t.offsetY - this.cropStart.my,
                a = e.offsetWidth,
                n = e.offsetHeight,
                o = this.cropStart.rect;
              let r = Math.max(0, Math.min(a - o.w, o.x + s)),
                c = Math.max(0, Math.min(n - o.h, o.y + i));
              this.cropRect = { x: r, y: c, w: o.w, h: o.h };
            },
            onCropEnd() {
              this.cropDragging &&
                ((this.cropDragging = !1), this.applyCropToBackground());
            },
          },
        },
        R = O,
        M = (s("f0e6"), s("095d")),
        S = s.n(M),
        D = s("aac7"),
        L = s.n(D),
        N = Object(g["a"])(R, i, a, !1, null, "774fa8fa", null);
      ("function" === typeof S.a && S()(N),
        "function" === typeof L.a && L()(N));
      e["default"] = N.exports;
    },
    eb6c: function (t, e, s) {},
    f0e6: function (t, e, s) {
      "use strict";
      s("f90f");
    },
    f90f: function (t, e, s) {},
  },
]);
