import React from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import "./style.css";
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
function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("\\b" + escapedValue, "i");

  return people.filter(person => regex.test(getSuggestionValue(person)));
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
function getSuggestionValue(suggestion) {
  return `${suggestion.first} ${suggestion.last}`;
}

// Use your imagination to render suggestions.
function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.first} ${suggestion.last}`;
  const matches = match(suggestionText, query);
  const parts = parse(suggestionText, matches);

  return (
    <span className={"suggestion-content " + suggestion.twitter}>
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? "highlight" : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    </span>
  );
}

export default class SuggestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Entrer le CUID du Chef de Projet",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
