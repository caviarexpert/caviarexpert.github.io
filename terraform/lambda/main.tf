variable "name" {
  description = "The name of the lambda to create, which also defines (i) the archive name (.zip), (ii) the file name, and (iii) the function name"
}

variable "runtime" {
  description = "The runtime of the lambda to create"
  default     = "nodejs"
}

variable "handler" {
  description = "The handler name of the lambda (a function defined in your lambda)"
  default     = "handler"
}

variable "role" {
  description = "IAM role attached to the Lambda Function (ARN)"
}

data "archive_file" "lambda_zip" {
    type        = "zip"
    source_dir  = "src-python"
    output_path = "./.tmp/lambda.zip"
}

resource "aws_lambda_function" "lambda" {
  filename      = "./.tmp/lambda.zip"
  source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
  function_name = "${var.name}_${var.handler}"
  role          = "${var.role}"
  handler       = "${var.name}.${var.handler}"
  runtime       = "${var.runtime}"
}

output "name" {
  value = "${aws_lambda_function.lambda.function_name}"
}