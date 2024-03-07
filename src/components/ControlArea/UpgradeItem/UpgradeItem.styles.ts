import styled from '@emotion/styled';
import {UpgradeProps} from '../../../types.ts';

export const UpgradePrice = styled.span`
	float: right;
`

export const UpgradeButton = styled.div<UpgradeProps>`
	@media screen and (max-width: 430px) {
		font-size: 93%;
		text-align: start;
	}
	display: flex;
	flex-direction: row;
	cursor: pointer;
	justify-content: space-between;
	width: 100%;
	color: #FEFEFE;
	font-family: 'Press Start 2P', system-ui;
	&:hover {
		color: #5d5d5d;
	}
	${props => props.isDark === false && `
		color: #5d5d5d;
		&:hover {
			color: #797979;
		}
  `}
`