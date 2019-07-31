import ConfigClient from 'spring-cloud-config-client-js';
import * as path from 'path';
import * as fs from 'fs';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'dev';
const config = require('../configServerConfig.json');
const configClient = new ConfigClient(config);

const isTravisTest = process.env.TRAVIS_TEST === 'true';
const isProduction = process.env.NODE_ENV === 'production' ? true : false;

const travisTestCofnig = { "basicToken": "basicToken", "serverUrl": "http://localhost:8080" };
const initConfig = async () => {
  if (isTravisTest) {
    console.log("this job working on travis test env");

    const filePath = path.join(__dirname, '..', 'config.json');
    fs.writeFileSync(filePath, JSON.stringify(travisTestCofnig));
  }
  else {
    console.log('start fetching config env: ', env);

    const fileName = isProduction ? 'config.prov.json' : 'config.json';
    const filePath = path.join(__dirname, '..', fileName);

    try {
      await configClient.write(filePath, {
        name: "web",
        profile: env,
      });
      console.log("fetching config is done");
    } catch (e) {
      console.error('fetching config is fail');
      console.error(e);
    }
  }

};


initConfig();