/* PAYPAL */
data "aws_s3_bucket_object" "paypal_config" {
  bucket = "caviarexpert-vault"
  key    = "paypal-config.json.txt"
}
/* POSTMEN */
data "aws_s3_bucket_object" "postmen_config" {
  bucket = "caviarexpert-vault"
  key    = "postmen-config.json.txt"
}
/* S3 bucket where all Lambda artifacts reside */
data "aws_s3_bucket_object" "lambdas_bucket" {
  bucket = "caviarexpert-vault"
  key    = "lambdas-bucket"
}