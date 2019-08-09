import React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const Option = AutoComplete.Option;
/** 三个部分：input，options list，select*/
export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        // console.log(value);
        // const players = nba.searchPlayers(value);
        // console.log(players);

        this.setState({
            dataSource: !value ?
                [] : nba.searchPlayers(value).map(player => ({
                    fullName: player.fullName,
                    playerId: player.playerId,
                }))
        })
    }

        onSelect = (playerName) => {
            this.props.handleSelectPlayer(playerName);
            console.log(playerName);
        }

        render() {
            const { dataSource } = this.state;
            const options = dataSource.map((player) => (
                <Option key={player.fullName} value={player.fullName}  className="player-option">
                    <img className="player-option-image"  src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`} alt={"Photo"}/>
                    <span className="player-option-label">{player.fullName}</span>
                </Option>
            ));

            return (
                <AutoComplete
                    className="search-bar"
                    size="large"
                    dataSource={options}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="Search NBA Player"
                    optionLabelProp="value"
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                </AutoComplete>
            );
        }
    }