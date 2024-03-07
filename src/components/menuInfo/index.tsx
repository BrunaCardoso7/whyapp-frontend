import { Button, Drawer, Flex } from 'antd'
import HeaderChat from '../header'
import React, { useContext, useState } from 'react'
import { ChatContext } from '@/contexts/chatContext'
import ImageProfile from '../profile/imageProfile'
import NameProfile from './components/NameProfile'
import { DownOutlined, UserOutlined } from '@ant-design/icons'

const settingsButtonStyle: React.CSSProperties = {
  background: 'transparent',
  position: 'fixed',
  width: '100vw',
  zIndex: 0,
}
const menuConteiner: React.CSSProperties = {
  overflowY: 'scroll',
  backgroundColor: 'rgba(18, 29, 40, 0.9)',
  backdropFilter: 'blur(2px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  right: '0',
  bottom: '0',
  width: '300px',
  zIndex: 1,
}
const ImageProfileStyle: React.CSSProperties = {
  margin: '12px 0',
  padding: '10px 44px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '.2px solid #848383',
  gap: '16px',
}
const stutusProfileStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
}
const ConteinerMenuStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}
const LabelStyle: React.CSSProperties = {
  color: '#A3A3A3',
  fontSize: '.7rem',
  fontWeight: 600,
  paddingLeft: '16px',
}
const descriptionStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '.8rem',
  padding: '8px 16px',
}
const SilenceNotificationsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#434455',
  gap: '28px',
  borderRadius: '8px',
  width: '90%',
}
const textToggle: React.CSSProperties = {
  color: 'white',
  padding: '8px 16px',
}
const MenuInfo = () => {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const { currentUser } = useContext(ChatContext)

  const showDrawer = () => {
    setSettingsMenuOpen(true)
  }

  const onClose = () => {
    setSettingsMenuOpen(false)
  }
  return (
    <>
      <Button
        className="general-settings-button"
        style={settingsButtonStyle}
        shape="circle"
        icon={<HeaderChat />}
        type="primary"
        onClick={showDrawer}
      />
      <Drawer
        className="ant-drawer-body"
        placement="right"
        closable={false}
        onClose={onClose}
        open={settingsMenuOpen}
        getContainer={document.body}
        style={menuConteiner}
      >
        {currentUser && (
          <Flex vertical style={ConteinerMenuStyle}>
            <Flex vertical style={ImageProfileStyle}>
              <ImageProfile
                image={currentUser.image}
                key={currentUser.userId}
                size="180px"
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <NameProfile>{currentUser.username}</NameProfile>
                <div style={stutusProfileStyle}>
                  <UserOutlined style={{ color: 'white' }} />
                  <p style={{ color: 'white' }}>
                    {currentUser.chatPrivate ? 'online' : 'offline'}
                  </p>
                </div>
              </div>
            </Flex>
            <div>
              <p style={LabelStyle}>Descrição</p>
              <p style={descriptionStyle}>
                Tá pegando fogo bixo, manda pix ai rapidao pra eu testar um
                negócio aqui ...
              </p>
            </div>
            <div style={SilenceNotificationsStyle}>
              <p style={textToggle}>Silenciar notificações</p>
              <DownOutlined style={{ color: 'white' }} />
            </div>
          </Flex>
        )}
      </Drawer>
    </>
  )
}
export default MenuInfo