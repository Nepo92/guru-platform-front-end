import AboutCompany from './about-company/aboutCompany.js';
import Events from './events/events.js';
import KnowledgeBase from './knowledge-base/knowledgeBase.js';
import Production from './production/production.js';
import Reglament from './reglament/reglament.js';
import TrainingCenter from './training-center/trainingCenter.js';

import Utils from '../../../utils/utils.js';

const aboutCompany = new AboutCompany();
const events = new Events();
const knowledgeBase = new KnowledgeBase();
const production = new Production();
const reglament = new Reglament();
const trainingCenter = new TrainingCenter();

const utils = new Utils();

const ABOUT_COMPANY = 'about-company';
const KNOWLEDGE_BASE = 'bookmarks';
const TRAINING_CENTER = 'training-center';
const REGULATIONS = 'regulations';
const MANAGMENT = 'management';
const ADVERTISER = 'advertiser';
const MANAGER = 'manager';
const EVENTS = 'events';
const PRODUCTION = 'production';

class OnlineOffice {
  init(props) {
    const page = utils.getPage();
    const prePage = utils.getPage(1);

    this.dispatchPageName(page, props);
    this.dispatchSecondPageName(prePage, page, props);
  }

  dispatchPageName(page, props) {
    switch (page) {
      case ABOUT_COMPANY: {
        aboutCompany.init.bind(aboutCompany)(props);
        break;
      }
      case KNOWLEDGE_BASE: {
        knowledgeBase.init.bind(knowledgeBase)(props);
        break;
      }
      case TRAINING_CENTER: {
        trainingCenter.init.bind(trainingCenter)(props);
        break;
      }
      case REGULATIONS: {
        reglament.init.bind(reglament)(props);
        break;
      }
      case EVENTS: {
        events.init.bind(events)(props);
        break;
      }
      case PRODUCTION: {
        production.init.bind(production)(props);
        break;
      }
      default: {
        break;
      }
    }
  }

  dispatchSecondPageName(prePage, page, props) {
    switch (prePage) {
      case REGULATIONS: {
        switch (page) {
          case MANAGER:
          case ADVERTISER:
          case MANAGMENT: {
            reglament.init.bind(reglament)(props);
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      case KNOWLEDGE_BASE: {
        switch (page) {
          case MANAGER:
          case ADVERTISER:
          case MANAGMENT: {
            knowledgeBase.init.bind(knowledgeBase)(props);
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      case TRAINING_CENTER: {
        trainingCenter.init.bind(trainingCenter)(props);

        switch (page) {
          case MANAGER:
          case ADVERTISER: {
            trainingCenter.init.bind(trainingCenter)(props);
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default OnlineOffice;
