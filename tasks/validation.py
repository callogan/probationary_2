from dataclasses import dataclass


@dataclass
class ValidationResult:
    validation_map: dict
    block_name_id_corp: dict
