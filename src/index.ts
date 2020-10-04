import App from './App';

const app = new App();

const CleverDate = {
  start: app.start.bind(app),
  stop: app.stop.bind(app)
};

module.exports = CleverDate;
export default CleverDate;
