import View from "./View.js";
import previewView from './previewView.js';

class ResultView extends View{
    _parentElement = document.querySelector(".results");
    _errorMessage = 'No recipie(s) found for your search query :(';
    _message = '';
  
    _generateMarkup() {
      return this._data.map(result => previewView.render(result, false)).join('');
    }

}
export default new ResultView();