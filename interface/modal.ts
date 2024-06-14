export interface IModal {
    modalIsOpen: boolean;
    contentTitle: string;
    closeModal?: (props:any) => void ;
    handlerRequest:(props:any) => void;
    showHandleButtons?: boolean;
    handleDeleteButton?: string;
    handleDeclineButton?: string;
    onlyConfirmButton?: boolean;
    deleteButtonClass?: string;
    declineButtonClass?: string;
    closeRequestModal?: () => void;
    id?: string
}