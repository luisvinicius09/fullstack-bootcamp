import React, { Component } from 'react'
import {formatNumber} from '../helpers/formatHelpers'
import css from './header.module.css';

export default class Header extends Component {
    handleInputChange = (event) => {
        const newText = event.target.value;

        this.props.onChangeFilter(newText);
    }
    render() {
        const {filter, countryCount, totalPopulation} = this.props;
        return (
            <div className={css.flexRow}>
                <input placeholder='Filter' type="text" value={filter} onChange={this.handleInputChange} /> |
                <span className={css.countries}> Countries: <strong>{countryCount}</strong></span> |
                <span className={css.population}> Population: <strong>{formatNumber(totalPopulation)}</strong></span>
            </div>
        )
    }
}
