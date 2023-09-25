import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { logout } from '@/redux/reducerSlices/userSlice';
import { useDispatch } from 'react-redux';
import { HamburgerIcon, AddIcon, WarningIcon,IconButton, ExternalLinkIcon, RepeatIcon, EditIcon,Button,ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CustomMenu =(props)=>{
    const dispatch = useDispatch();
    const toast = useToast();
    const router =useRouter();

    const handleLogOut = ()=>{
        dispatch(logout());
          toast({
            title: 'Logout Successful!',
            // description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
      }
  
    return(
      <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        variant='outline'
      >
        <Avatar src='https://bit.ly/broken-link' />
  
   
      </MenuButton>
      <MenuList style={{ padding: '10px' , color: 'black', fontSize: '2rem'}}>
        <MenuItem icon={<AddIcon />} command='⌘T' onClick={()=>router.push('/account')}>
  My Account      </MenuItem>
        <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
          New Window
        </MenuItem>
        <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
          Open Closed Tab
        </MenuItem>
        {props.token && <MenuItem icon={<EditIcon />} command='⌘O' onClick = {handleLogOut}>
         Log Out!
        </MenuItem>}
      </MenuList>
    </Menu>
    )
  }

  export default CustomMenu;