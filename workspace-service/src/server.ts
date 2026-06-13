import { createApp } from './app';

const app = createApp();
const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`Workspace service running on port ${PORT}`);
});
