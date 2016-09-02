'use babel';

import LanguageMqscView from './language-mqsc-view';
import { CompositeDisposable } from 'atom';

export default {

  languageMqscView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageMqscView = new LanguageMqscView(state.languageMqscViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageMqscView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-mqsc:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageMqscView.destroy();
  },

  serialize() {
    return {
      languageMqscViewState: this.languageMqscView.serialize()
    };
  },

  toggle() {
    console.log('LanguageMqsc was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
