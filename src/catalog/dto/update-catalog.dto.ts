import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class updateCatalogDto {
    @ApiPropertyOptional()
    price: number;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    createdAt: string

    @ApiPropertyOptional()
    updatedAt: string

    @ApiProperty()
    id: number

}
