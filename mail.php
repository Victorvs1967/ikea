<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$email = $_POST['user_email'];

$mail->isSMTP();                                        // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  				        // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                                 // Enable SMTP authentication
$mail->Username = 'victorsmirnov67@gmail.com';          // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'victorS77';                          // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'tls';                              // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                      // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('victorsmirnov67@gmail.com');            // от кого будет уходить письмо?
$mail->addAddress('victorsmirnov67@gmail.com');         // Кому будет уходить письмо 
$mail->isHTML(true);                                    // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body    = '' .$name . ' оставил заявку.<br>Почта этого пользователя: ' .$email;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>