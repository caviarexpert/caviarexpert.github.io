/*
variable "aws_access_key" {
    description = "AWS access key"
}
variable "aws_secret_key" {
    description = "AWS secret key"
}
variable "aws_region" {
    description = "AWS region"
}

variable "aws_simpledb_domain" {
    description = "Simple DB domain name"
}
variable "aws_account_id" {
    description = "AWS account ID (for ARN genreation)"
}
*/
variable "aws_region" {
    description = "AWS region"
}

variable "aws_account_id" {
    description = "AWS account id for ARN generation"
}

variable "s3_bucket" {
    description = "s3 bucket with lambda zip-file"
}

variable "s3_key" {
    description = "s3 key of zip-file"
}

variable "s3_object_version" {
    description = "s3 file version"
}

variable "role_arn" {
    description = "Role ARN for lambda"
}
variable "lambda_zip_hash" {
    description = "Hashcode of zip-archive with lambda"
}

variable "api_root_id" {
    description = "ID of the API root resource"
}

variable "api_id" {
    description = "ID of the API"
}