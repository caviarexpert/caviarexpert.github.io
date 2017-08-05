data "aws_s3_bucket_object" "paypal_secret" {
  bucket = "caviarexpert-vault"
  key    = "paypal-secret"
}
data "aws_s3_bucket_object" "postmen_api_key" {
  bucket = "caviarexpert-vault"
  key    = "postmen-api-key"
}

data "aws_s3_bucket_object" "lambdas_bucket" {
  bucket = "caviarexpert-vault"
  key    = "lambdas-bucket"
}