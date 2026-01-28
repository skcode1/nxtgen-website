import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/ui/StaggeredMenu";

const Navbar = () => {
  const menuItems: StaggeredMenuItem[] = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#hero' },
    { label: 'About', ariaLabel: 'Learn about the hackathon', link: '#vision' },
    { label: 'Tracks', ariaLabel: 'View hackathon tracks', link: '#tracks' },
    { label: 'Schedule', ariaLabel: 'View schedule', link: '#schedule' },
    { label: 'Prizes', ariaLabel: 'View prizes', link: '#prizes' },
    { label: 'Guests', ariaLabel: 'View guests of honour', link: '#mentors' },
    { label: 'FAQ', ariaLabel: 'View frequently asked questions', link: '#faq' },
    { label: 'Apply', ariaLabel: 'Apply for hackathon', link: 'https://www.instagram.com/nxtgen_2k26/' },
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'YouTube', link: 'https://youtube.com' },
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#fff"
      openMenuButtonColor="#000"
      changeMenuColorOnOpen={true}
      colors={['#6D28D9', '#7C3AED', '#8B5CF6']}
      logoUrl="/assets/logo/srm.png"
      accentColor="#8B5CF6"
      isFixed={true}
      closeOnClickAway={true}
    />
  );
};

export default Navbar;
