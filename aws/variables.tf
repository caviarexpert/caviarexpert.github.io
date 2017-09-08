variable "aws_simpledb_domain" {
    description = "Simple DB domain name"
}
variable "aws_account_id" {
    description = "AWS account ID (for ARN genreation)"
}
variable "paypal_ipn_url_part" {
    description = "URL file part of Paypal IPN Lambda funtion"
    default = "paypal-ipn"
}
