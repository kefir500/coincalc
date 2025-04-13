import { Plugin } from 'vite';
import favicons, { type FaviconOptions } from 'favicons';

export default function faviconPlugin(source: string, options: FaviconOptions): Plugin {
  let tags: string[];

  return {
    name: 'favicon',
    apply: 'build',

    async generateBundle() {
      const result = await favicons(source, options);
      tags = result.html.filter((tag) =>
        !tag.includes('mobile-web-app') &&
        !tag.includes('webmanifest')
      );

      result.images.forEach((asset) => {
        this.emitFile({
          type: 'asset',
          fileName: asset.name,
          source: asset.contents,
        });
      });
    },

    transformIndexHtml(html: string) {
      return html.replace('</head>', `  ${tags.join('\n    ') + '\n'}</head>`);
    },
  };
}
