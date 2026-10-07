import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const [productText, packageText] = await Promise.all([
  readFile(path.join(root, 'product.json'), 'utf8'),
  readFile(path.join(root, 'package.json'), 'utf8'),
]);

const product = JSON.parse(productText);
const packageJson = JSON.parse(packageText);
const gallery = product.extensionsGallery;

assert.equal(product.version, packageJson.version, 'product.json and package.json versions must match.');
assert.ok(gallery, 'product.json must configure an extension gallery.');
assert.equal(gallery.serviceUrl, 'https://open-vsx.org/vscode/gallery');
assert.equal(gallery.itemUrl, 'https://open-vsx.org/vscode/item');
assert.equal(gallery.publisherUrl, 'https://open-vsx.org/namespace');
assert.equal(
  gallery.resourceUrlTemplate,
  'https://open-vsx.org/vscode/unpkg/{publisher}/{name}/{version}/{path}',
);
assert.equal(
  gallery.extensionUrlTemplate,
  'https://open-vsx.org/vscode/gallery/{publisher}/{name}/latest',
);

for (const [key, value] of Object.entries(gallery)) {
  assert.ok(!/trypear\.ai|vscode-unpkg\.net|marketplace\.visualstudio\.com/i.test(value),
    `Gallery field ${key} must not use a legacy/private marketplace host.`);
}
assert.ok(
  product.linkProtectionTrustedDomains?.includes('https://open-vsx.org'),
  'Open VSX must be a trusted link-protection domain.',
);

console.log(`Distribution configuration is valid (Cortex.dev ${packageJson.version}; Open VSX).`);
