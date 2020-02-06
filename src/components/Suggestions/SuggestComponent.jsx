import React from "react";
import Autosuggest from "react-autosuggest";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import "./style.css";
import axios from "axios";
import uuid from "uuid";

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const people = [
  {
    first: "Charlie",
    last: "Brown",
    twitter: "dancounsell"
  },
  {
    first: "Charlotte",
    last: "White",
    twitter: "mtnmissy"
  },
  {
    first: "Chloe",
    last: "Jones",
    twitter: "ladylexy"
  },
  {
    first: "Cooper",
    last: "King",
    twitter: "steveodom"
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
async function getSuggestions(value) {  
  const escapedValue = escapeRegexCharacters(value.trim());  

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("\\b" + escapedValue, "i");

  const result = await axios.get(
    `http://microsvc.orange.cm/api/InfoEmployee/v2?logins=${value}`
  );  
  return result.data.filter(user => regex.test(getSuggestionValue(user)));
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
function getSuggestionValue(suggestion) {
  return `${suggestion.LogonName}`;
}

// Use your imagination to render suggestions.
function renderSuggestion(suggestion, { query }) {
  return (
    <span className={"suggestion-content "}>
      <span className="img_suggest">
        <img
          src={
            "http://microsvc.orange.cm/api/InfoEmployee/photo/v0/" +
            suggestion.LogonName
          }
        />
      </span>
      <span className="name">
        <span>
          {suggestion.Name}, {suggestion.LogonName}
        </span>
      </span>
    </span>
  );
}

export default class SuggestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
      noSuggestions: false,
      suggestionSelected: '',
      id: uuid.v4()
    };
  }

  /* componentDidUpdate(prevProps){
    if(this.props.value !== prevProps.value){
      this.setState({
        value: this.props.value
      })
    }
  } */

  componentDidMount(){
    this.setState({
      value: this.props.value
    });
  }

  onChangeSuggestComponent = (event, { newValue, method }) => {    
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    let suggestions = await getSuggestions(value);
    const isInputBlank = value.trim() === '';
    const noSuggestions = !isInputBlank && suggestions.length === 0;
    let suggestionSelected = '';
    if(!noSuggestions){
      suggestionSelected = getSuggestionValue(suggestions[0]);
    }
    this.setState({
      suggestions: suggestions,
      noSuggestions: noSuggestions,        
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],            
    });
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    
    this.setState({
      noSuggestions: false,
      suggestionSelected: getSuggestionValue(suggestion)
    });
    this.props.onChangeChefProjet({suggestedSelected: suggestion, error: this.state.noSuggestions})
  };

  shouldRenderSuggestions = value => {
    return value.trim().length > 1;
  };

  render() {
    let { value, suggestions, noSuggestions, suggestionSelected } = this.state;
    if(this.props.value){      
      noSuggestions = false;
      suggestionSelected = value
    }
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      name: 'chefProjetCuid',
      placeholder: "Entrer le CUID du Chef de Projet",
      value,      
      onChange: this.onChangeSuggestComponent,
      type: "text"
    };

    const renderInputComponent = inputProps => (
      <FormGroup>
        <label>{this.props.label}</label>
        <Input {...inputProps} invalid={noSuggestions || suggestionSelected.trim().length <= 0} />
        <FormFeedback>
          {noSuggestions || suggestionSelected.trim().length <= 0 ? "Utilisateur Introuvable": ""}
        </FormFeedback>
      </FormGroup>
    );    

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
        focusInputOnSuggestionClick={false}
        onSuggestionSelected={this.onSuggestionSelected}
        id={this.state.id}
      />
    );
  }
}
