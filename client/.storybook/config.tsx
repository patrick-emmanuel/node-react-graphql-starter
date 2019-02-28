import { configure } from '@storybook/react';
import '../src/index.css';
import 'tachyons'

const req = require.context('../src/stories', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
