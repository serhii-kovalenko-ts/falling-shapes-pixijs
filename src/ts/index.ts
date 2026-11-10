import { AppController } from './controllers/App.controller';
import { AppModel } from './models/App.model';
import { AppView } from './views/App.view';

const main = () => {
  const model = new AppModel();
  const view = new AppView(model);
  const controller = new AppController(model, view);
};

window.onload = main;
