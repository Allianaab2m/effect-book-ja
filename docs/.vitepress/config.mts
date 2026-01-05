import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import markdownItBudoux from "markdown-it-budoux";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "ja-JP",
  title: "Effect Books JA",
  description: "Effect-TSを学ぶための日本語ドキュメント",
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans+JP:wght@100;200;300;400;500;600;700&display=swap",
      },
    ],
  ],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],
    editLink: {
      pattern: "https://github.com/Allianaab2m/effect-book-ja/edit/main/:path",
      text: "このページを編集する",
    },

    lastUpdated: {
      text: "最終更新",
    },

    sidebar: [
      {
        text: "はじめに",
        items: [
          { text: "イントロダクション", link: "/intro" },
          { text: "環境構築", link: "/setup" },
        ],
      },
      {
        text: "1章: 基本",
        items: [{ text: "基本的な型と関数", link: "/basic/101" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Allianaab2m/effect-book-ja" },
    ],

    search: {
      provider: "local",
      options: {
        miniSearch: {
          options: {
            tokenize: (term) => {
              if (typeof term === "string") term = term.toLowerCase();
              const segmenter =
                Intl.Segmenter &&
                new Intl.Segmenter("ja-JP", { granularity: "word" });
              if (!segmenter) return [term];
              const tokens = [];
              for (const seg of segmenter.segment(term)) {
                // biome-ignore lint/suspicious/noTsIgnore: enable miniSearch ignore
                // @ts-ignore
                // ignore spaces
                if (seg.segment.trim() !== "") tokens.push(seg.segment);
              }
              return tokens;
            },
          },
        },
      },
    },
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
    languages: ["js", "ts", "tsx", "jsx"],
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
    config: (md) => {
      md.use(markdownItBudoux({ language: "ja" }));
    },
  },
});
