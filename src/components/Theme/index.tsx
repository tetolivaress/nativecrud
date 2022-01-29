import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
  height: 48px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
  width: 100px;
`;

export const StyledText = styled.Text`
  text-align: center;
  color: #380000;
`;

export const StyledBoldText = styled.Text`
  text-align: center;
  color: #380000;
  font-weight: 700;
`;

export const StyledCurrency = styled.TouchableOpacity`
  background-color: #fff;
  height: 32px;
  margin: 8px 18px;
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 4px;
`;

export const RedirectToCreate = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 12px;
  background-color: orchid;
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

export const StyledInput = styled.TextInput`
  height: 32px;
  background-color: ${({disabled}) => (disabled ? '#e7e7e7' : '#fff')};
  margin: 12px 0 6px 0;
  padding: 8px;
  border-radius: 4px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 24px;
`;

export const Average = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  margin: 24px;
`;

export const AverageText = styled.Text`
  font-size: 15px;
  font-weight: ${({weight}) => weight || 500};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
`;

export const ConfirmationContainer = styled.View`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
`;
