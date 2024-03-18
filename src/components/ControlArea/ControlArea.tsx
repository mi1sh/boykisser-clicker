import {Button, ControlAreaWrapper, UpgradeList} from './ControlArea.styles.ts';
import {ControlAreaProps} from '../../types.ts';
import {Modal} from '../Modal/Modal.tsx';
import {useEffect, useRef, useState} from 'react';
import {UpgradeItem} from './UpgradeItem/UpgradeItem.tsx';

export const ControlArea = ({setClickCount, isDark, clickCount}: ControlAreaProps) => {
	const [modalType, setModalType] = useState<string | null>(null)
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
	const initialUpgrades = localStorage.getItem('upgrades');
	const [upgrades, setUpgrades] = useState(initialUpgrades ? JSON.parse(initialUpgrades) : {
		passiveClick: 0,
		x2PerClick: false,
		x3PerClick: false,
	});

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		console.log('useEffect');
		if (upgrades.passiveClick > 0) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}

			intervalRef.current = setInterval(() => {
				setClickCount(prev => prev + 1);
				console.log('click');
			}, 3000 / upgrades.passiveClick);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		}
	}, [upgrades.passiveClick, setClickCount]);

	useEffect(() => {
		localStorage.setItem('upgrades', JSON.stringify(upgrades));
	}, [upgrades]);

	const handleNewGame = () => {
		setModalType(null);
		setClickCount(0);
	};

	return modalType ? (
		<Modal modalIsOpen={true} setModalIsOpen={() => setModalType(null)}>
			{modalType === 'newGame' && (
				<>
					<h2>Are u sure?</h2>
					<div>
						<Button isDark={isDark} style={{marginRight: '1em'}} onClick={() => handleNewGame()}>
							Yep
						</Button>
						<Button isDark={isDark} onClick={() => setModalType(null)}>
							Nope
						</Button>
					</div>
				</>
			)}
			{modalType === 'upgrades' && (
				<>
					<h2>Upgrades:</h2>
					<UpgradeList>
						<UpgradeItem key={0} text={'Passive click lvl.1'} price={1000} isDark={isDark} clickCount={clickCount} setClickCount={setClickCount} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}/>
						<UpgradeItem key={1} text={'Passive click lvl.2'} price={10000} isDark={isDark} clickCount={clickCount} setClickCount={setClickCount} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}/>
						<UpgradeItem key={2} text={'Passive click lvl.3'} price={100000} isDark={isDark} clickCount={clickCount} setClickCount={setClickCount} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}/>

						<UpgradeItem key={3} text={'X2 per click'} price={100000} isDark={isDark} clickCount={clickCount} setClickCount={setClickCount} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}/>
						<UpgradeItem key={4} text={'X3 per click'} price={1000000} isDark={isDark} clickCount={clickCount} setClickCount={setClickCount} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}/>
					</UpgradeList>
				</>
			)}
		</Modal>
	) : (
		<ControlAreaWrapper>
			<Button isDark={isDark} onClick={() => setModalType('upgrades')}>Upgrades</Button>
			<Button isDark={isDark} onClick={() => setModalType('newGame')}>New game</Button>
		</ControlAreaWrapper>
	);
};
