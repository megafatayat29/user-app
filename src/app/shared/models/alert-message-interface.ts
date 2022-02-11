export interface AlertMessage {
    status: 'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning';
    text: string;
}