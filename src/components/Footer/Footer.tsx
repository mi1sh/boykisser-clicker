import {ThemeSwitcher} from './ThemeSwitcher/ThemeSwitcher.tsx';
import {FooterProps} from '../../types.ts';
import {FooterWrapper} from './Footer.styles.ts';

export const Footer = ({isDark, setIsDark}: FooterProps) => {
	return (
		<FooterWrapper>
			{localStorage.userName && (
				<span className="inactiveSwitch" style={{fontSize: '0.7em'}}>user: {localStorage.userName}</span>
			)}
			<ThemeSwitcher isDark={isDark} setIsDark={setIsDark}/>
			<a href={'https://github.com/mi1sh/boykisser-clicker'} target='_blank' className='inactiveSwitch'>github</a>
		</FooterWrapper>
	);
};
