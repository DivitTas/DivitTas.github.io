import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const fontData = readFileSync(
    resolve('./node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff')
  );

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: '#06070d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'JetBrains Mono',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                background: '#0c0e18',
                border: '1px solid #232841',
                borderRadius: '12px',
                padding: '48px 56px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
                minWidth: '720px',
              },
              children: [
                // Terminal bar
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '32px',
                    },
                    children: [
                      { type: 'div', props: { style: { width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' } } },
                      { type: 'div', props: { style: { width: 12, height: 12, borderRadius: '50%', background: '#febc2e' } } },
                      { type: 'div', props: { style: { width: 12, height: 12, borderRadius: '50%', background: '#28c840' } } },
                    ],
                  },
                },
                // Prompt line
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: '12px', marginBottom: '16px' },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: { color: '#6dffae', fontSize: '28px', letterSpacing: '0.02em' },
                          children: 'divit@batcomputer:~$',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: { color: '#f0ead6', fontSize: '28px' },
                          children: 'whoami',
                        },
                      },
                    ],
                  },
                },
                // Output
                {
                  type: 'div',
                  props: {
                    style: { color: '#ffb347', fontSize: '52px', fontWeight: '700', letterSpacing: '-0.02em', marginTop: '8px' },
                    children: 'Divit Tasgaonkar',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'JetBrains Mono', data: fontData, weight: 400, style: 'normal' }],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
