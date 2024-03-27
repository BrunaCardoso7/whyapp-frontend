import { apiFunction } from '@/api/api'
import { ChatContext } from '@/contexts/chatContext'
import { User } from '@/model/UserModel'
import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Flex, Input } from 'antd'
import Cookies from 'js-cookie'
import { ChangeEvent, Key, useContext, useState } from 'react'
import { UserCard } from '../UserCard'
import './styles.css'

const searchInputBarStyles: React.CSSProperties = {
  background:
    'linear-gradient(to bottom right, #C9C9C94D, #C4C4C41A) padding-box, linear-gradient(to bottom left, #FFFFFF4D, #D3D3D31A) border-box',
  color: '#FFFFFF',
  display: 'flex',
  padding: '0 1rem',
  boxSizing: 'border-box',
  height: '28px',
  width: '100%',
  gap: '20px',
  alignItems: 'center',
}
const newChatButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#E6E6E6',
}

export const FindUser = () => {
  const [userNameSearchedList, setUserNameSearchedList] = useState('')
  const [userFriend, setUserFriend] = useState<User>()
  const userId = Cookies.get('userId')

  const { data, isLoading, isError } = useQuery<User[], Error>({
    queryKey: ['user-list'],
    queryFn: apiFunction.getUser,
  })

  const { mutate } = useMutation({
    mutationFn: () => apiFunction.postFriendsUser(userFriend?.id || ''),
  })

  const dataArray = data ? Object.values(data) : []

  const { setRecipient } = useContext(ChatContext)

  const onFindInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const findUserNameValue = event?.target.value
    setUserNameSearchedList(findUserNameValue)
  }

  const filteredUserNameList = dataArray.flat().filter((user: User) => {
    return user?.nome
      ?.toLowerCase()
      .includes(userNameSearchedList.toLowerCase())
  })
  const onClickUserCard = (user: User) => {
    console.log('esse card foi clicado')
    setRecipient({
      id: user.id,
      nome: user.nome,
      avatar: user.avatar,
    })
    setUserFriend(user)
  }

  return (
    <>
      <Input
        className="find-input-bar"
        style={searchInputBarStyles}
        onChange={onFindInputChange}
        placeholder="busque por um usuário ou grupo..."
      />
      <Flex vertical style={{ gap: '1.5rem', height: '100%', width: '100%' }}>
        {isLoading && <h3>carregando...</h3>}
        {isError && <h3>Algo ocorreu... peun peun peeuun</h3>}
        {userNameSearchedList &&
          filteredUserNameList
            ?.filter((userNome) => userNome.id !== userId)
            .map((user: User, index: Key | null | undefined) => {
              return (
                <>
                  <div className="userCardStyle">
                    <UserCard
                      key={index}
                      name={user.nome}
                      image={user.avatar}
                      onClick={() => onClickUserCard(user)}
                    />
                    <Button
                      style={newChatButtonStyle}
                      className="newChatButtonStyle"
                      shape="circle"
                      icon={<PlusOutlined />}
                      typeof="primary"
                      onClick={() => mutate()}
                    />
                  </div>
                </>
              )
            })}
      </Flex>
    </>
  )
}
